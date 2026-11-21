import os,random,time,logging,requests
logging.basicConfig(level=logging.INFO,format="%(asctime)s %(levelname)s %(message)s")
api=os.getenv("SENTINEL_API_URL","http://localhost:8000").rstrip("/");key=os.getenv("SENTINEL_INGEST_API_KEY","local-demo-ingest-key-change-me");delay=float(os.getenv("SIMULATOR_INTERVAL_SECONDS","3"))
machines=[{"machine_external_id":"MOTOR-001","temperature":52.0,"vibration":2.6,"pressure":96.0,"energy":4.1},{"machine_external_id":"PRESS-002","temperature":58.0,"vibration":3.1,"pressure":105.0,"energy":5.0},{"machine_external_id":"PUMP-003","temperature":49.0,"vibration":2.1,"pressure":88.0,"energy":3.7}]
logging.info("Create these machine IDs in the console first: %s",", ".join(x["machine_external_id"] for x in machines))
while True:
 for m in machines:
  d={k:round(v+random.uniform(-.8,.8),2) for k,v in m.items() if k!="machine_external_id"};d["machine_external_id"]=m["machine_external_id"]
  if random.random()<.035:d.update(temperature=round(random.uniform(92,116),2),vibration=round(random.uniform(8,14),2))
  try:
   r=requests.post(api+"/api/v1/telemetry/ingest",json=d,headers={"X-Ingest-Key":key},timeout=5)
   if r.status_code==404:logging.warning("Register %s in the console first",m["machine_external_id"])
   else:r.raise_for_status();logging.info("%s -> %s",m["machine_external_id"],r.json())
  except requests.RequestException as e:logging.warning("Ingestion failed: %s",e)
 time.sleep(delay)
