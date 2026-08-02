import { useCallback, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { API_BASE } from '../services/api';

const MAX_LOG_LINES = 200;

/**
 * Owns the single Socket.IO connection to the backend and exposes:
 *  - live state (connection status, comments, leads, event log)
 *  - action functions the UI calls (connectRoom, pause, resume, ...)
 *
 * Kept as one hook so App.jsx stays a thin layout component.
 */
export function useSocket() {
  const socketRef = useRef(null);
  const [socketConnected, setSocketConnected] = useState(false);
  const [state, setState] = useState({ status: 'idle', username: null, paused: false, keywords: [] });
  const [comments, setComments] = useState([]);
  const [leads, setLeads] = useState([]);
  const [logs, setLogs] = useState([]);
  const [liveSince, setLiveSince] = useState(null);

  const pushLog = useCallback((level, message) => {
    setLogs((prev) => {
      const next = [...prev, { level, message, time: new Date().toISOString() }];
      return next.length > MAX_LOG_LINES ? next.slice(next.length - MAX_LOG_LINES) : next;
    });
  }, []);

  useEffect(() => {
    const socket = io(API_BASE, { transports: ['websocket', 'polling'] });
    socketRef.current = socket;

    socket.on('connect', () => {
      setSocketConnected(true);
      pushLog('info', 'Dashboard connected to backend server');
    });
    socket.on('disconnect', () => setSocketConnected(false));
    socket.on('connect_error', (err) => pushLog('error', `Backend connection error: ${err.message}`));

    socket.on('bootstrap', (data) => {
      setState(data.state);
      setComments(data.comments || []);
      setLeads(data.leads || []);
      setLiveSince(data.state?.status === 'listening' ? new Date().toISOString() : null);
    });

    socket.on('status', (payload) => {
      setState((prev) => ({ ...prev, ...payload }));
      if (payload.status === 'listening') {
        setLiveSince((prev) => prev || new Date().toISOString());
      }
      if (['idle', 'disconnected', 'error'].includes(payload.status)) {
        setLiveSince(null);
      }
      const label = payload.status === 'error' ? 'error' : 'info';
      pushLog(label, `Status → ${payload.status}${payload.message ? `: ${payload.message}` : ''}`);
    });

    socket.on('comment', (comment) => {
      setComments((prev) => [...prev, comment]);
    });

    socket.on('lead', ({ lead, created }) => {
      setLeads((prev) => {
        const idx = prev.findIndex((l) => l.phoneNumber === lead.phoneNumber);
        if (idx === -1) return [...prev, lead];
        const next = [...prev];
        next[idx] = lead;
        return next;
      });
      if (created) pushLog('info', `Lead captured: ${lead.phoneNumber} (@${lead.uniqueId})`);
    });

    socket.on('keyword-match', ({ comment, keywords }) => {
      pushLog('info', `Keyword match [${keywords.join(', ')}] — @${comment.uniqueId}`);
    });

    socket.on('cleared', () => {
      setComments([]);
      setLeads([]);
      pushLog('info', 'Comment and lead history cleared');
    });

    return () => {
      socket.disconnect();
    };
  }, [pushLog]);

  const connectRoom = useCallback((username, keywords) => {
    socketRef.current?.emit('connect-room', { username, keywords });
  }, []);
  const pause = useCallback(() => socketRef.current?.emit('pause'), []);
  const resume = useCallback(() => socketRef.current?.emit('resume'), []);
  const disconnectRoom = useCallback(() => socketRef.current?.emit('disconnect-room'), []);
  const updateKeywords = useCallback((keywords) => socketRef.current?.emit('update-keywords', keywords), []);
  const clearData = useCallback(() => socketRef.current?.emit('clear-data'), []);

  return {
    socketConnected,
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
  };
}
