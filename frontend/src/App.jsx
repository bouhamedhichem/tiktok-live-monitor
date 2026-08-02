import React from 'react';
import Header from './components/Header.jsx';
import ConnectionPanel from './components/ConnectionPanel.jsx';
import LiveFeed from './components/LiveFeed.jsx';
import LeadsTable from './components/LeadsTable.jsx';
import { useSocket } from './hooks/useSocket.js';

export default function App() {
  const {
    state,
    comments,
    leads,
    logs,
    liveSince,
    connectRoom,
    pause,
    resume,
    disconnectRoom,
    updateKeywords,
    clearData,
  } = useSocket();

  const actions = { connectRoom, pause, resume, disconnectRoom, updateKeywords, clearData };

  return (
    <div className="app-shell">
      <Header status={state.status} username={state.username} />
      <div className="app-body">
        <ConnectionPanel state={state} comments={comments} leads={leads} logs={logs} liveSince={liveSince} actions={actions} />
        <main className="main-content">
          <div className="panes">
            <LiveFeed comments={comments} />
            <LeadsTable leads={leads} />
          </div>
        </main>
      </div>
    </div>
  );
}
