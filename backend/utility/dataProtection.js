import crypto from "crypto";

const ENCRYPTION_ALGO = "aes-256-gcm";

const getKey = () => {
  const base =
    process.env.DATA_PROTECTION_KEY || "kjkiuiuhgvbvfgrtygvcsesxcxer45r";
  return crypto.createHash("sha256").update(String(base)).digest();
};

export const encryptSensitive = (value) => {
  if (value == null || value === "") return null;

  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ENCRYPTION_ALGO, getKey(), iv);
  const ciphertext = Buffer.concat([cipher.update(String(value), "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();

  return `${iv.toString("base64")}.${tag.toString("base64")}.${ciphertext.toString("base64")}`;
};

export const decryptSensitive = (encoded) => {
  if (!encoded || typeof encoded !== "string") return null;

  const parts = encoded.split(".");
  if (parts.length !== 3) return encoded;

  const [ivB64, tagB64, cipherB64] = parts;
  const decipher = crypto.createDecipheriv(
    ENCRYPTION_ALGO,
    getKey(),
    Buffer.from(ivB64, "base64")
  );
  decipher.setAuthTag(Buffer.from(tagB64, "base64"));

  const plaintext = Buffer.concat([
    decipher.update(Buffer.from(cipherB64, "base64")),
    decipher.final(),
  ]);

  return plaintext.toString("utf8");
};
