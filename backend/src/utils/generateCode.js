import { nanoid } from "nanoid";

export const generateCode = (customCode) => {
  if (customCode && customCode.trim().length > 0) {
    return customCode.trim().toLowerCase();
  }
  // Auto-generates a 6-character short code
  return nanoid(6).toLowerCase();
};
