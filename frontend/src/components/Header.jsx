import React from 'react';
import { Radio, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext.jsx';

const STATUS_LABELS = {
  idle: 'Idle',
  connecting: 'Connecting…',
  listening: 'Live',
  paused: 'Paused',
  disconnected: 'Disconnected',
  error: 'Error',
};

const STATUS_CLASS = {
  listening: 'is-listening',
  connecting: 'is-connecting',
  paused: 'is-paused',
  error: 'is-error',
};

export default function Header({ status, username }) {
  const { theme, toggleTheme } = useTheme();
  const pillClass = STATUS_CLASS[status] || '';

  return (
    <header className="app-header">
      <div className="brand">
        <div className="brand-mark">
          <Radio size={16} strokeWidth={2.5} />
        </div>
        <div>
          <div className="brand-title">TikTok Live Monitor</div>
          <div className="brand-subtitle">Comment tracking &amp; lead capture</div>
        </div>
      </div>

      <div className="header-right">
        <span className={`status-pill ${pillClass}`}>
          <span className="status-dot" />
          {STATUS_LABELS[status] || status}
          {username && (status === 'listening' || status === 'paused') ? ` · @${username}` : ''}
        </span>

        <button
          className="icon-button"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </header>
  );
}
