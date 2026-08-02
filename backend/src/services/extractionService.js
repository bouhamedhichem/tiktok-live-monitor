const config = require('../config');

// Matches sequences that look like phone numbers: optional leading +,
// then digits grouped with spaces, dots, dashes or parentheses.
// This is intentionally broad (comments are messy) — normalizePhone()
// below does the real validation.
const PHONE_CANDIDATE_REGEX = /(\+?\d[\d\s\-().]{6,}\d)/g;

// Matches @mentions inside a comment (e.g. "@johndoe check this out")
const MENTION_REGEX = /@([a-zA-Z0-9._]{2,24})/g;

/**
 * Strips everything but digits (and a leading +) from a phone candidate,
 * then validates the resulting digit count against configured bounds.
 * Returns a normalized string like "+21612345678" or null if it doesn't
 * look like a plausible phone number.
 */
function normalizePhone(raw) {
  const hasPlus = raw.trim().startsWith('+');
  const digits = raw.replace(/\D/g, '');

  if (digits.length < config.phone.minDigits || digits.length > config.phone.maxDigits) {
    return null;
  }

  return hasPlus ? `+${digits}` : digits;
}

/**
 * Scans a comment string for phone-number-like sequences.
 * Returns an array of normalized, deduplicated phone numbers found in
 * this single comment (usually 0 or 1, occasionally more).
 */
function extractPhoneNumbers(text) {
  if (!text) return [];
  const matches = text.match(PHONE_CANDIDATE_REGEX) || [];
  const normalized = matches.map(normalizePhone).filter(Boolean);
  return [...new Set(normalized)];
}

/**
 * Scans a comment for @mentions of other usernames.
 */
function extractMentions(text) {
  if (!text) return [];
  const mentions = new Set();
  let match;
  MENTION_REGEX.lastIndex = 0;
  while ((match = MENTION_REGEX.exec(text)) !== null) {
    mentions.add(match[1]);
  }
  return [...mentions];
}

/**
 * Checks which of the configured/custom keywords appear in the comment
 * (case-insensitive, whole-word where possible).
 */
function extractKeywords(text, keywordList) {
  if (!text || !keywordList || keywordList.length === 0) return [];
  const lowerText = text.toLowerCase();
  return keywordList.filter((kw) => kw && lowerText.includes(kw.toLowerCase()));
}

/**
 * Runs all extraction routines on a raw comment and returns a structured
 * summary that the rest of the app (storage, UI) can consume directly.
 */
function analyzeComment(text, keywordList) {
  return {
    phoneNumbers: extractPhoneNumbers(text),
    mentions: extractMentions(text),
    matchedKeywords: extractKeywords(text, keywordList),
  };
}

module.exports = {
  normalizePhone,
  extractPhoneNumbers,
  extractMentions,
  extractKeywords,
  analyzeComment,
};
