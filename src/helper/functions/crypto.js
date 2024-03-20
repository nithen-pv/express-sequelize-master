import crypto from "crypto";

export const generateRandomBytes = (size) => {
  return crypto.randomBytes(size).toString("hex");
};

export const generateTokenHash = (token) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};
