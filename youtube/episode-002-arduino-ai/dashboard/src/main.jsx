import React, { useCallback, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
function Metric({ label, value, suffix = "" }) {
  return <div className="metric"><span>{label}</span><strong>{value ?? "—"}{value == null ? "" : suffix}</strong></div>;
}
function App() {
  const [reading, setReading] = useState(null), [history, setHistory] = useState([]);
  const [busy, setBusy] = useState(false), [error, setError] = useState(""), [health, setHealth] = useState("checking");
  const refresh = useCallback(async () => {
    try {
      const [a,b,c] = await Promise.all([fetch(`${API}/api/latest`),fetch(`${API}/api/history?limit=30`),fetch(`${API}/health`)]);
      if (!a.ok || !b.ok || !c.ok) throw new Error("API request failed");
      const latest = await a.json(), rows = await b.json();
      setReading(latest.reading); setHistory(rows.items || []); setHealth("online"); setError("");
    } catch { setHealth("offline"); setError("Cannot reach the backend. Start FastAPI and check the API URL."); }
  }, []);
  useEffect(() => { refresh(); const id = setInterval(refresh,2500); return () => clearInterval(id); },[refresh]);
  async function sendTest() {
    setBusy(true); setError("");
    try {
      const n = Math.floor(50 + Math.random()*900);
      const r = await fetch(`${API}/api/telemetry`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({device_id:"codec-simulator",sequence:Date.now(),raw_adc:n,voltage:Number((n*5/1023).toFixed(3)),source:"simulator"})});
      if (!r.ok) throw new Error("Test reading rejected"); await refresh();
    } catch(e) { setError(e.message || "Could not send test reading"); } finally { setBusy(false); }
  }
  async function explain() {
    setBusy(true); setError("");
    try { const r=await fetch(`${API}/api/explain`,{method:"POST"}), data=await r.json(); if(!r.ok) throw new Error(data.detail || "Explanation request failed"); await refresh(); }
    catch(e) { setError(e.message || "Could not generate explanation"); } finally { setBusy(false); }
  }
  const percent = reading ? Math.round(reading.raw_adc/1023*100) : 0;
  return <main className="shell">
    <header className="topbar"><div className="brand"><div className="brandmark">C</div><div><b>CodeCram</b><small>AIoT LAB / LIVE TELEMETRY</small></div></div><div className={`status ${health}`}><i/>{health==="online"?"API ONLINE":health.toUpperCase()}</div></header>
    <section className="hero"><div><p className="eyebrow">ARDUINO × ESP32 × AI</p><h1>Sensor intelligence,<br/><em>made visible.</em></h1><p className="sub">A live learning lab for connected hardware, backend engineering and responsible AI.</p></div><div className="hero-chip"><span>DEVICE NETWORK</span><strong>01 <small>GATEWAY</small></strong><div className="pulse"/></div></section>
    {error && <div className="alert">{error}</div>}
    <section className="section-head"><div><p className="eyebrow">01 / DEVICE TELEMETRY</p><h2>Live measurements</h2></div><button onClick={sendTest} disabled={busy}>{busy?"WORKING…":"＋ SEND TEST READING"}</button></section>
    <section className="metrics"><Metric label="RAW ADC" value={reading?.raw_adc ?? null} suffix=" / 1023"/><Metric label="REPORTED VOLTAGE" value={reading?Number(reading.voltage).toFixed(3):null} suffix=" V"/><Metric label="INPUT LEVEL" value={reading?percent:null} suffix="%"/><Metric label="DEVICE" value={reading?.device_id ?? null}/></section>
    <section className="grid">
      <article className="panel"><div className="panel-title"><div><p className="eyebrow">SIGNAL MONITOR</p><h3>Analog input</h3></div><span className="live-tag">● LIVE</span></div><div className="gauge"><div className="gauge-track"><div className="gauge-fill" style={{width:`${percent}%`}}/></div><div className="gauge-labels"><span>0</span><b>{reading?.raw_adc ?? "WAITING"}</b><span>1023</span></div></div><p className="muted">Raw 10-bit demo input, not a calibrated physical measurement.</p></article>
      <article className="panel"><div className="panel-title"><div><p className="eyebrow">EXPLANATION ENGINE</p><h3>AI interpretation</h3></div><span className="ai-icon">✳</span></div><p className="explanation">{reading?.explanation || "Waiting for a reading. Send a test reading or connect the hardware gateway."}</p><div className="source-row"><span>EXPLANATION SOURCE</span><b>{reading?.explanation_source || "—"}</b></div><button className="secondary" disabled={!reading || busy} onClick={explain}>Generate explanation</button><p className="fine">AI text is an interpretation and may be wrong. Raw measurements remain the source of truth.</p></article>
    </section>
    <section className="panel history-panel"><div className="panel-title"><div><p className="eyebrow">02 / RECENT EVENTS</p><h3>Telemetry history</h3></div><span className="muted">{history.length} records</span></div>
      {history.length===0?<div className="empty">No readings yet. Send a test reading to explore the dashboard.</div>:<div className="table-wrap"><table><thead><tr><th>DEVICE</th><th>ADC</th><th>VOLTAGE</th><th>SOURCE</th><th>SEQUENCE</th></tr></thead><tbody>{history.map((item,i)=><tr key={`${item.device_id}-${item.sequence}-${i}`}><td>{item.device_id}</td><td>{item.raw_adc}</td><td>{Number(item.voltage).toFixed(3)} V</td><td><span className={`tag ${item.source}`}>{item.source}</span></td><td>{item.sequence}</td></tr>)}</tbody></table></div>}
    </section><footer><span>CODECRAM / AIoT LAB</span><span>BUILT TO LEARN · TEST · VERIFY</span></footer>
  </main>;
}
createRoot(document.getElementById("root")).render(<App />);
