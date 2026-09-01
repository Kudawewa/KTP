/**
 * Shared form-field validators for the booking and fleet-enquiry modals, so the
 * two forms agree on what a valid email / AU mobile looks like.
 */

/** Basic shape check — a local part, an "@", and a dotted domain. */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/**
 * Australian mobile: exactly 10 digits starting "04". Spaces and other
 * separators the customer might type ("0412 345 678") are ignored — only the
 * digits are checked.
 */
export function isValidAuMobile(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return digits.length === 10 && digits.startsWith("04");
}

/**
 * Returns an error message for a phone field, or "" when it's valid.
 * Empty input is reported as required so callers get one consistent message.
 */
export function phoneError(phone: string): string {
  if (!phone.trim()) return "Required";
  if (!isValidAuMobile(phone))
    return "Enter a valid 10-digit mobile starting with 04";
  return "";
}

/** Returns an error message for an email field, or "" when it's valid. */
export function emailError(email: string): string {
  if (!email.trim()) return "Required";
  if (!isValidEmail(email)) return "Enter a valid email";
  return "";
}
