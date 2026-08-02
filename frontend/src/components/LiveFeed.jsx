import React, { useMemo, useState } from 'react';
import { Search, MessageSquare } from 'lucide-react';
import { formatTime, initials } from '../utils/format.js';
import EmptyState from './EmptyState.jsx';

export default function LiveFeed({ comments }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all'); // all | keyword | phone
  const [sort, setSort] = useState('newest');

  const filtered = useMemo(() => {
    let rows = comments;

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      rows = rows.filter(
        (c) => c.text.toLowerCase().includes(q) || c.uniqueId.toLowerCase().includes(q) || c.nickname.toLowerCase().includes(q)
      );
    }

    if (filter === 'keyword') {
      rows = rows.filter((c) => c.matchedKeywords && c.matchedKeywords.length > 0);
    } else if (filter === 'phone') {
      rows = rows.filter((c) => c.hasPhoneNumber);
    }

    rows = [...rows].sort((a, b) =>
      sort === 'newest' ? new Date(b.timestamp) - new Date(a.timestamp) : new Date(a.timestamp) - new Date(b.timestamp)
    );

    return rows;
  }, [comments, query, filter, sort]);

  return (
    <div className="pane">
      <div className="toolbar">
        <div className="search-box">
          <Search size={14} />
          <input placeholder="Search comments or usernames…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <select className="select-input" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All comments</option>
          <option value="keyword">Keyword matches</option>
          <option value="phone">Contains phone number</option>
        </select>
        <select className="select-input" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>
      </div>

      <div className="pane-header">
        <span>Live feed</span>
        <span className="pane-count">{filtered.length}</span>
      </div>

      <div className="pane-scroll">
        {filtered.length === 0 && (
          <EmptyState
            icon={<MessageSquare size={30} />}
            title={comments.length === 0 ? 'No comments yet' : 'No comments match your filters'}
            subtitle={
              comments.length === 0
                ? 'Connect to a TikTok LIVE room to start watching comments arrive here in real time.'
                : 'Try clearing the search box or switching the filter.'
            }
          />
        )}
        {filtered.map((c) => {
          const isKeyword = c.matchedKeywords && c.matchedKeywords.length > 0;
          const isLead = c.hasPhoneNumber;
          const variant = isLead ? 'is-lead' : isKeyword ? 'is-keyword' : '';
          return (
            <div className={`feed-item ${variant}`} key={c.id}>
              <div className="feed-avatar">{initials(c.nickname || c.uniqueId)}</div>
              <div className="feed-body">
                <div className="feed-meta">
                  <span className="feed-username">@{c.uniqueId}</span>
                  <span className="feed-time">{formatTime(c.timestamp)}</span>
                </div>
                <div className="feed-text">{c.text}</div>
                {(isKeyword || isLead) && (
                  <div className="feed-tags">
                    {isLead && <span className="tag tag-lead">Phone detected</span>}
                    {c.matchedKeywords.map((kw) => (
                      <span className="tag tag-keyword" key={kw}>
                        {kw}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
