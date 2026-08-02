import React, { useMemo, useState } from 'react';
import { Search, Phone, ChevronUp, ChevronDown } from 'lucide-react';
import { formatDateTime } from '../utils/format.js';
import EmptyState from './EmptyState.jsx';

const COLUMNS = [
  { key: 'phoneNumber', label: 'Phone' },
  { key: 'uniqueId', label: 'Username' },
  { key: 'mentionCount', label: 'Seen' },
  { key: 'lastSeen', label: 'Last seen' },
];

export default function LeadsTable({ leads }) {
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState('lastSeen');
  const [sortDir, setSortDir] = useState('desc');

  const toggleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  };

  const rows = useMemo(() => {
    let data = leads;
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      data = data.filter((l) => l.phoneNumber.includes(q) || l.uniqueId.toLowerCase().includes(q));
    }
    data = [...data].sort((a, b) => {
      let av = a[sortKey];
      let bv = b[sortKey];
      if (sortKey === 'lastSeen' || sortKey === 'firstSeen') {
        av = new Date(av).getTime();
        bv = new Date(bv).getTime();
      }
      if (typeof av === 'string') return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
      return sortDir === 'asc' ? av - bv : bv - av;
    });
    return data;
  }, [leads, query, sortKey, sortDir]);

  return (
    <div className="pane">
      <div className="toolbar">
        <div className="search-box">
          <Search size={14} />
          <input placeholder="Search phone or username…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
      </div>

      <div className="pane-header">
        <span>Leads captured</span>
        <span className="pane-count">{rows.length}</span>
      </div>

      <div className="pane-scroll">
        {rows.length === 0 ? (
          <EmptyState
            icon={<Phone size={30} />}
            title={leads.length === 0 ? 'No leads yet' : 'No leads match your search'}
            subtitle={
              leads.length === 0
                ? 'Phone numbers detected in public comments will appear here, deduplicated automatically.'
                : 'Try a different search term.'
            }
          />
        ) : (
          <table className="leads-table">
            <thead>
              <tr>
                {COLUMNS.map((col) => (
                  <th key={col.key} onClick={() => toggleSort(col.key)}>
                    {col.label}{' '}
                    {sortKey === col.key ? (
                      sortDir === 'asc' ? (
                        <ChevronUp size={11} style={{ display: 'inline' }} />
                      ) : (
                        <ChevronDown size={11} style={{ display: 'inline' }} />
                      )
                    ) : null}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((lead) => (
                <tr key={lead.phoneNumber}>
                  <td className="phone-value">{lead.phoneNumber}</td>
                  <td>@{lead.uniqueId}</td>
                  <td>
                    <span className="mention-badge">×{lead.mentionCount}</span>
                  </td>
                  <td>{formatDateTime(lead.lastSeen)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
