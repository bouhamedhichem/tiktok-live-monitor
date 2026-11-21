from pathlib import Path
import joblib,numpy as np
from fastapi import FastAPI
from pydantic import BaseModel,Field
from sklearn.ensemble import IsolationForest
MODEL=Path("/app/models/anomaly_isolation_forest.joblib")
app=FastAPI(title="SentinelAI ML Inference",version="0.1.0");model=None
class Vector(BaseModel):
 temperature:float=Field(ge=-40,le=250);vibration:float=Field(ge=0,le=100)
 pressure:float=Field(ge=0,le=500);energy:float=Field(ge=0,le=10000)
@app.on_event("startup")
def startup():
 global model
 if MODEL.exists():model=joblib.load(MODEL)
@app.get("/health")
def health():return {"status":"ok","model_loaded":model is not None,"model":"IsolationForest" if model is not None else None}
@app.post("/train-demo")
def train_demo():
 global model
 rng=np.random.default_rng(42);n=6000
 x=np.column_stack([rng.normal(52,8,n),rng.normal(2.8,.8,n),rng.normal(95,12,n),rng.normal(4.2,.7,n)])
 model=IsolationForest(n_estimators=250,contamination=.035,random_state=42,n_jobs=-1).fit(x)
 MODEL.parent.mkdir(parents=True,exist_ok=True);joblib.dump(model,MODEL)
 return {"trained":True,"model":"IsolationForest","training_rows":n,"dataset":"synthetic-normal-baseline","warning":"Demo model only; not validated for industrial use"}
@app.post("/predict/anomaly")
def predict(x:Vector):
 v=np.array([[x.temperature,x.vibration,x.pressure,x.energy]])
 if model is None:
  s=max(0,(x.temperature-78)/32,(x.vibration-7)/8,(x.pressure-150)/150)
  return {"anomaly":s>=.3,"score":round(float(min(1,s)),3),"method":"baseline_fallback","model_version":None}
 raw=float(model.decision_function(v)[0]);score=float(1/(1+np.exp(raw*5)))
 return {"anomaly":bool(model.predict(v)[0]==-1),"score":round(score,4),"method":"isolation_forest","model_version":"iforest-demo-v1"}
