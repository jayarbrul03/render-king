import { timingSafeEqual } from "node:crypto";

export function verifyPassword(input: string, expected: string): boolean {
  if (!expected) return false;

  const provided = Buffer.from(input);
  const target = Buffer.from(expected);

  if (provided.length !== target.length) return false;

  return timingSafeEqual(provided, target);
}
