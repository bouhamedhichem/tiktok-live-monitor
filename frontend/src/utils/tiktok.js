/**
 * Accepts what the user pastes into the "TikTok LIVE" field — a full link
 * like "https://www.tiktok.com/@name/live", a profile link, a bare
 * "@name", or a plain "name" — and returns just the username, or an empty
 * string if nothing recognizable was found.
 */
export function extractTikTokUsername(input) {
  if (!input) return '';
  const trimmed = input.trim();

  // Full TikTok URL, with or without protocol/www, live or profile page:
  // tiktok.com/@username, tiktok.com/@username/live, m.tiktok.com/@username
  const urlMatch = trimmed.match(/tiktok\.com\/@([a-zA-Z0-9._]+)/i);
  if (urlMatch) return urlMatch[1];

  // Short share links (vm.tiktok.com/... or vt.tiktok.com/...) don't embed
  // the username in the URL itself — we can't resolve those client-side.
  if (/(vm|vt)\.tiktok\.com\//i.test(trimmed)) return '';

  // Bare "@username"
  const atMatch = trimmed.match(/^@([a-zA-Z0-9._]+)$/);
  if (atMatch) return atMatch[1];

  // Plain "username"
  if (/^[a-zA-Z0-9._]+$/.test(trimmed)) return trimmed;

  return '';
}
