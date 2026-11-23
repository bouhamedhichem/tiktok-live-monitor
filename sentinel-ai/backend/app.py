from datetime import datetime,timedelta,timezone
from typing import Literal
from fastapi import FastAPI,Depends,HTTPException,Header
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel,EmailStr,Field
from pydantic_settings import BaseSettings
from sqlalchemy import create_engine,String,Float,DateTime,ForeignKey,Boolean,Text,desc
from sqlalchemy.orm import DeclarativeBase,sessionmaker,Mapped,mapped_column,relationship,Session
from sqlalchemy import text
from sqlalchemy.exc import IntegrityError
from jose import jwt,JWTError
from passlib.context import CryptContext

class Settings(BaseSettings):
 jwt_secret:str=Field(min_length=32);access_token_minutes:int=60
 database_url:str;cors_origins:str="http://localhost:5173"
 sentinel_ingest_api_key:str=Field(min_length=32)
 class Config: env_file=".env"
cfg=Settings()
db_url=cfg.database_url
if db_url.startswith("postgres://"):db_url=db_url.replace("postgres://","postgresql+psycopg://",1)
elif db_url.startswith("postgresql://"):db_url=db_url.replace("postgresql://","postgresql+psycopg://",1)
engine=create_engine(db_url,pool_pre_ping=True,pool_recycle=300,connect_args={"check_same_thread":False} if db_url.startswith("sqlite") else {})
SessionLocal=sessionmaker(bind=engine,autoflush=False,autocommit=False)
class Base(DeclarativeBase):pass
def get_db():
 db=SessionLocal()
 try:yield db
 finally:db.close()
def utcnow():return datetime.now(timezone.utc)
class Organization(Base):
 __tablename__="organizations"
 id:Mapped[int]=mapped_column(primary_key=True);name:Mapped[str]=mapped_column(String(120))
class User(Base):
 __tablename__="users"
 id:Mapped[int]=mapped_column(primary_key=True);email:Mapped[str]=mapped_column(String(255),unique=True,index=True)
 password_hash:Mapped[str]=mapped_column(String(255));role:Mapped[str]=mapped_column(String(30),default="admin")
 organization_id:Mapped[int]=mapped_column(ForeignKey("organizations.id"),index=True);is_active:Mapped[bool]=mapped_column(Boolean,default=True)
 organization=relationship("Organization")
class Machine(Base):
 __tablename__="machines"
 id:Mapped[int]=mapped_column(primary_key=True);external_id:Mapped[str]=mapped_column(String(80),unique=True,index=True)
 name:Mapped[str]=mapped_column(String(120));machine_type:Mapped[str]=mapped_column(String(80),default="Industrial motor")
 location:Mapped[str]=mapped_column(String(120),default="Production floor");status:Mapped[str]=mapped_column(String(30),default="operational")
 organization_id:Mapped[int]=mapped_column(ForeignKey("organizations.id"),index=True)
class Reading(Base):
 __tablename__="sensor_readings"
 id:Mapped[int]=mapped_column(primary_key=True);machine_id:Mapped[int]=mapped_column(ForeignKey("machines.id"),index=True)
 temperature:Mapped[float]=mapped_column(Float);vibration:Mapped[float]=mapped_column(Float);pressure:Mapped[float]=mapped_column(Float);energy:Mapped[float]=mapped_column(Float)
 recorded_at:Mapped[datetime]=mapped_column(DateTime(timezone=True),default=utcnow,index=True);anomaly_score:Mapped[float]=mapped_column(Float,default=0);severity:Mapped[str]=mapped_column(String(20),default="normal")
class Incident(Base):
 __tablename__="incidents"
 id:Mapped[int]=mapped_column(primary_key=True);organization_id:Mapped[int]=mapped_column(ForeignKey("organizations.id"),index=True)
 machine_id:Mapped[int]=mapped_column(ForeignKey("machines.id"),index=True);title:Mapped[str]=mapped_column(String(180))
 description:Mapped[str]=mapped_column(Text,default="");severity:Mapped[str]=mapped_column(String(20),default="medium")
 status:Mapped[str]=mapped_column(String(20),default="open");created_at:Mapped[datetime]=mapped_column(DateTime(timezone=True),default=utcnow)
pwd=CryptContext(schemes=["argon2"],deprecated="auto");oauth=OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")
def make_token(u):
 exp=utcnow()+timedelta(minutes=cfg.access_token_minutes)
 return jwt.encode({"sub":str(u.id),"org":u.organization_id,"role":u.role,"exp":exp},cfg.jwt_secret,algorithm="HS256")
def current_user(token:str=Depends(oauth),db:Session=Depends(get_db)):
 try:c=jwt.decode(token,cfg.jwt_secret,algorithms=["HS256"]);uid=int(c["sub"])
 except (JWTError,ValueError,KeyError,TypeError):raise HTTPException(401,"Invalid or expired credentials")
 u=db.query(User).filter(User.id==uid,User.is_active.is_(True)).first()
 if not u or u.organization_id!=c.get("org"):raise HTTPException(401,"Invalid credentials")
 return u
def own_machine(db,u,mid):
 m=db.query(Machine).filter(Machine.id==mid,Machine.organization_id==u.organization_id).first()
 if not m:raise HTTPException(404,"Machine not found")
 return m
class Register(BaseModel):
 organization_name:str=Field(min_length=2,max_length=120);email:EmailStr;password:str=Field(min_length=10,max_length=128)
class Login(BaseModel):email:EmailStr;password:str
class MachineIn(BaseModel):
 external_id:str=Field(min_length=2,max_length=80,pattern=r"^[A-Za-z0-9][A-Za-z0-9._-]*$");name:str=Field(min_length=2,max_length=120)
 machine_type:str="Industrial motor";location:str="Production floor"
class Telemetry(BaseModel):
 machine_external_id:str;temperature:float=Field(ge=-40,le=250);vibration:float=Field(ge=0,le=100)
 pressure:float=Field(ge=0,le=500);energy:float=Field(ge=0,le=10000);recorded_at:datetime|None=None
class IncidentIn(BaseModel):
 machine_id:int;title:str=Field(min_length=3,max_length=180);description:str=Field(default="",max_length=2000);severity:Literal["low","medium","high","critical"]="medium"
app=FastAPI(title="SentinelAI API",version="0.1.0",description="Industrial telemetry and predictive-maintenance foundation")
app.add_middleware(CORSMiddleware,allow_origins=[x.strip() for x in cfg.cors_origins.split(",") if x.strip()],allow_credentials=True,allow_methods=["GET","POST","PATCH"],allow_headers=["Authorization","Content-Type","X-Ingest-Key"])
@app.on_event("startup")
def startup():Base.metadata.create_all(bind=engine)
@app.get("/health")
def health():return {"status":"ok","service":"sentinel-api","version":"0.1.0"}
@app.get("/ready")
def ready():
 try:
  with engine.connect() as connection:connection.execute(text("SELECT 1"))
  return {"status":"ready","database":"connected"}
 except Exception:raise HTTPException(503,"Database unavailable")
@app.post("/api/v1/auth/register",status_code=201)
def register(d:Register,db:Session=Depends(get_db)):
 email=d.email.lower()
 if db.query(User).filter(User.email==email).first():raise HTTPException(409,"Email already registered")
 o=Organization(name=d.organization_name.strip());db.add(o);db.flush()
 u=User(email=email,password_hash=pwd.hash(d.password),organization_id=o.id,role="admin");db.add(u);db.commit();db.refresh(u)
 return {"access_token":make_token(u),"token_type":"bearer","user":{"id":u.id,"email":u.email,"role":u.role,"organization":o.name}}
@app.post("/api/v1/auth/login")
def login(d:Login,db:Session=Depends(get_db)):
 u=db.query(User).filter(User.email==d.email.lower()).first()
 if not u or not pwd.verify(d.password,u.password_hash) or not u.is_active:raise HTTPException(401,"Incorrect email or password")
 return {"access_token":make_token(u),"token_type":"bearer","user":{"id":u.id,"email":u.email,"role":u.role,"organization":u.organization.name}}
@app.get("/api/v1/machines")
def machines(db:Session=Depends(get_db),u:User=Depends(current_user)):return db.query(Machine).filter(Machine.organization_id==u.organization_id).order_by(Machine.id).all()
@app.post("/api/v1/machines",status_code=201)
def add_machine(d:MachineIn,db:Session=Depends(get_db),u:User=Depends(current_user)):
 if db.query(Machine).filter(Machine.external_id==d.external_id).first():raise HTTPException(409,"Machine ID is already registered")
 m=Machine(**d.model_dump(),organization_id=u.organization_id);db.add(m)
 try:db.commit()
 except IntegrityError:
  db.rollback();raise HTTPException(409,"Machine ID is already registered")
 db.refresh(m);return m
@app.get("/api/v1/machines/{mid}/latest")
def latest(mid:int,db:Session=Depends(get_db),u:User=Depends(current_user)):
 m=own_machine(db,u,mid);r=db.query(Reading).filter(Reading.machine_id==m.id).order_by(desc(Reading.recorded_at)).first();return {"machine":m,"reading":r}
def score(d):
 raw=max(0,(d.temperature-78)/32,(d.vibration-7)/8,(d.pressure-150)/150);s=round(min(1,float(raw)),3)
 return s,"critical" if s>=.75 else "warning" if s>=.3 else "normal"
@app.post("/api/v1/telemetry/ingest",status_code=202)
def ingest(d:Telemetry,x_ingest_key:str|None=Header(default=None),db:Session=Depends(get_db)):
 if not x_ingest_key or x_ingest_key!=cfg.sentinel_ingest_api_key:raise HTTPException(401,"Invalid ingestion key")
 m=db.query(Machine).filter(Machine.external_id==d.machine_external_id).first()
 if not m:raise HTTPException(404,"Unknown machine ID")
 s,level=score(d);db.add(Reading(machine_id=m.id,temperature=d.temperature,vibration=d.vibration,pressure=d.pressure,energy=d.energy,recorded_at=d.recorded_at or utcnow(),anomaly_score=s,severity=level))
 m.status="critical" if level=="critical" else "attention" if level=="warning" else "operational"
 if level!="normal":
  active=db.query(Incident).filter(Incident.machine_id==m.id,Incident.status=="open").first()
  if not active:db.add(Incident(organization_id=m.organization_id,machine_id=m.id,title=f"{level.title()} sensor anomaly detected",description=f"Baseline score {s:.2f}; temperature {d.temperature:.1f} °C; vibration {d.vibration:.1f} mm/s.",severity=level,status="open"))
 db.commit();return {"accepted":True,"machine_id":m.id,"anomaly_score":s,"severity":level,"scoring_method":"baseline_thresholds"}
@app.get("/api/v1/overview")
def overview(db:Session=Depends(get_db),u:User=Depends(current_user)):
 ms=db.query(Machine).filter(Machine.organization_id==u.organization_id).all();ids=[m.id for m in ms]
 rs=db.query(Reading).filter(Reading.machine_id.in_(ids)).order_by(Reading.recorded_at.desc()).limit(40).all() if ids else []
 opened=db.query(Incident).filter(Incident.organization_id==u.organization_id,Incident.status=="open").count()
 return {"machine_count":len(ms),"online_count":sum(m.status=="operational" for m in ms),"attention_count":sum(m.status=="attention" for m in ms),"critical_count":sum(m.status=="critical" for m in ms),"open_incidents":opened,"latest_readings":[{"machine_id":r.machine_id,"temperature":r.temperature,"vibration":r.vibration,"pressure":r.pressure,"energy":r.energy,"recorded_at":r.recorded_at.isoformat(),"anomaly_score":r.anomaly_score,"severity":r.severity} for r in reversed(rs)]}
@app.get("/api/v1/incidents")
def incidents(db:Session=Depends(get_db),u:User=Depends(current_user)):return db.query(Incident).filter(Incident.organization_id==u.organization_id).order_by(Incident.created_at.desc()).limit(100).all()
@app.post("/api/v1/incidents",status_code=201)
def create_incident(d:IncidentIn,db:Session=Depends(get_db),u:User=Depends(current_user)):
 own_machine(db,u,d.machine_id);i=Incident(**d.model_dump(),organization_id=u.organization_id);db.add(i);db.commit();db.refresh(i);return i
@app.patch("/api/v1/incidents/{iid}/resolve")
def resolve(iid:int,db:Session=Depends(get_db),u:User=Depends(current_user)):
 i=db.query(Incident).filter(Incident.id==iid,Incident.organization_id==u.organization_id).first()
 if not i:raise HTTPException(404,"Incident not found")
 i.status="resolved";db.commit();db.refresh(i);return i
