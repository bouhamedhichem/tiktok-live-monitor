import React, { useEffect, useState } from 'react';
import { Play, Pause, Trash2, Download, X, Plug, Unplug } from 'lucide-react';
import { formatUptime } from '../utils/format.js';
import { extractTikTokUsername } from '../utils/tiktok.js';
import { downloadExport } from '../services/api.js';

export default function ConnectionPanel({ state, comments, leads, logs, liveSince, actions }) {
  const [usernameInput, setUsernameInput] = useState(state.username || '');
  const [keywords, setKeywords] = useState(state.keywords || []);
  const [keywordInput, setKeywordInput] = useState('');
  const [exportOpen, setExportOpen] = useState(false);
  const [uptime, setUptime] = useState('00:00:00');
  const [linkError, setLinkError] = useState('');

  // Keep the local keyword list in sync the first time the backend tells
  // us its defaults (bootstrap), without clobbering edits afterwards.
  useEffect(() => {
    if (state.keywords && state.keywords.length && keywords.length === 0) {
      setKeywords(state.keywords);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.keywords]);

  useEffect(() => {
    if (!liveSince) {
      setUptime('00:00:00');
      return undefined;
    }
    const tick = () => setUptime(formatUptime(liveSince));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [liveSince]);

  const isIdle = state.status === 'idle' || state.status === 'disconnected' || state.status === 'error';
  const isConnected = state.status === 'listening' || state.status === 'paused';

  const handleConnect = (e) => {
    e.preventDefault();
    if (!usernameInput.trim()) return;

    const username = extractTikTokUsername(usernameInput);
    if (!username) {
      setLinkError(
        "Couldn't read a username from that. Paste the full LIVE link (tiktok.com/@name/live) or just the @name."
      );
      return;
    }
    setLinkError('');
    setUsernameInput(username);
    actions.connectRoom(username, keywords);
  };

  const addKeyword = (e) => {
    e.preventDefault();
    const value = keywordInput.trim();
    if (!value || keywords.includes(value)) {
      setKeywordInput('');
      return;
    }
    const next = [...keywords, value];
    setKeywords(next);
    setKeywordInput('');
    actions.updateKeywords(next);
  };

  const removeKeyword = (kw) => {
    const next = keywords.filter((k) => k !== kw);
    setKeywords(next);
    actions.updateKeywords(next);
  };

  return (
    <aside className="sidebar">
      <form className="panel-section" onSubmit={handleConnect}>
        <span className="panel-label">TikTok LIVE</span>
        <div className="input-row">
          <input
            className="text-input"
            placeholder="paste LIVE link or @username"
            value={usernameInput}
            onChange={(e) => {
              setUsernameInput(e.target.value);
              if (linkError) setLinkError('');
            }}
            disabled={isConnected || state.status === 'connecting'}
          />
        </div>
        {linkError && (
          <p className="helper-text" style={{ color: 'var(--accent-live)' }}>
            {linkError}
          </p>
        )}
        {isIdle && (
          <button className="btn btn-primary btn-block" type="submit" disabled={state.status === 'connecting'}>
            <Plug size={15} /> Connect
          </button>
        )}
        {(isConnected || state.status === 'connecting') && (
          <button className="btn btn-ghost btn-block" type="button" onClick={actions.disconnectRoom}>
            <Unplug size={15} /> Disconnect
          </button>
        )}
        <p className="helper-text">
          e.g. https://www.tiktok.com/@name/live, or just @name. Only connect to rooms you own or are authorized to
          monitor — this reads the same public chat anyone watching the LIVE can see.
        </p>
      </form>

      <div className="panel-section">
        <span className="panel-label">Keywords to flag</span>
        <div className="keyword-editor">
          {keywords.map((kw) => (
            <span className="chip" key={kw}>
              {kw}
              <button type="button" onClick={() => removeKeyword(kw)} aria-label={`Remove keyword ${kw}`}>
                <X size={12} />
              </button>
            </span>
          ))}
          <form onSubmit={addKeyword} style={{ display: 'inline-flex' }}>
            <input
              className="keyword-add-input"
              placeholder="+ add keyword"
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
            />
          </form>
        </div>
      </div>

      <div className="panel-section">
        <span className="panel-label">Controls</span>
        <div className="btn-row">
          {state.status === 'listening' ? (
            <button className="btn btn-secondary" onClick={actions.pause}>
              <Pause size={14} /> Pause
            </button>
          ) : (
            <button className="btn btn-secondary" onClick={actions.resume} disabled={state.status !== 'paused'}>
              <Play size={14} /> Resume
            </button>
          )}
          <button className="btn btn-secondary" onClick={actions.clearData}>
            <Trash2 size={14} /> Clear
          </button>
        </div>

        <div className="export-menu">
          <button className="btn btn-secondary btn-block" onClick={() => setExportOpen((o) => !o)} type="button">
            <Download size={14} /> Export
          </button>
          {exportOpen && (
            <div className="export-dropdown" onMouseLeave={() => setExportOpen(false)}>
              <button onClick={() => downloadExport('comments', 'csv')}>Comments → CSV</button>
              <button onClick={() => downloadExport('comments', 'xlsx')}>Comments → Excel</button>
              <button onClick={() => downloadExport('leads', 'csv')}>Leads → CSV</button>
              <button onClick={() => downloadExport('leads', 'xlsx')}>Leads → Excel</button>
            </div>
          )}
        </div>
      </div>

      <div className="panel-section">
        <span className="panel-label">Session</span>
        <div className="stat-grid">
          <div className="stat-card">
            <div className="stat-value">{comments.length}</div>
            <div className="stat-label">Comments</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{leads.length}</div>
            <div className="stat-label">Leads</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{uptime}</div>
            <div className="stat-label">Uptime</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{keywords.length}</div>
            <div className="stat-label">Keywords</div>
          </div>
        </div>
      </div>

      <div className="panel-section" style={{ flex: 1, minHeight: 0 }}>
        <span className="panel-label">Event log</span>
        <div className="log-panel">
          {logs.length === 0 && <div className="log-line">Waiting for activity…</div>}
          {logs
            .slice()
            .reverse()
            .map((log, i) => (
              <div className={`log-line ${log.level === 'error' ? 'log-error' : ''}`} key={i}>
                {new Date(log.time).toLocaleTimeString()} — {log.message}
              </div>
            ))}
        </div>
      </div>
    </aside>
  );
}
