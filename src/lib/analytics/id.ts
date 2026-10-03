import crypto from "crypto";

const VISITOR_ID_REGEX = /^V-[A-F0-9]{6}$/;
const SESSION_ID_REGEX = /^S-[A-F0-9]{6}$/;

/**
 * Generates a random, cryptographically safe, pseudonymized Visitor ID.
 * Format: V-XXXXXX (e.g. V-8F42A1)
 */
export function generateVisitorId(): string {
  const hex = crypto.randomBytes(3).toString("hex").toUpperCase();
  return `V-${hex}`;
}

/**
 * Generates a random, cryptographically safe Session ID.
 * Format: S-XXXXXX (e.g. S-19D7C4)
 */
export function generateSessionId(): string {
  const hex = crypto.randomBytes(3).toString("hex").toUpperCase();
  return `S-${hex}`;
}

/**
 * Validates whether a given string is a valid pseudonymized Visitor ID.
 */
export function isValidVisitorId(id: unknown): boolean {
  if (typeof id !== "string") return false;
  return VISITOR_ID_REGEX.test(id.trim());
}

/**
 * Validates whether a given string is a valid Session ID.
 */
export function isValidSessionId(id: unknown): boolean {
  if (typeof id !== "string") return false;
  return SESSION_ID_REGEX.test(id.trim());
}

/**
 * Normalizes or generates a safe Visitor ID from an untrusted client string.
 */
export function sanitizeVisitorId(id: unknown): string {
  if (isValidVisitorId(id)) {
    return (id as string).trim();
  }
  return generateVisitorId();
}

/**
 * Normalizes or generates a safe Session ID from an untrusted client string.
 */
export function sanitizeSessionId(id: unknown): string {
  if (isValidSessionId(id)) {
    return (id as string).trim();
  }
  return generateSessionId();
}
