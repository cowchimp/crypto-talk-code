import crypto from "crypto";
import util from "util";
import assert from "assert";
const randomBytes = util.promisify(crypto.randomBytes);

const algorithm = "aes-256-cbc";

// alice's side
const plaintext = Buffer.from("Hello Node.TLV", "utf8");
const iv = await randomBytes(16);
const key = loadKey();
const cipher = crypto.createCipheriv(algorithm, key, iv);
const ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final()]);
console.log({
  ciphertext: ciphertext.toString("base64"),
  iv: iv.toString("base64"),
});

// bob's side
const decipher = crypto.createDecipheriv(algorithm, key, iv);
const plaintextBob = Buffer.concat([
  decipher.update(ciphertext),
  decipher.final(),
]);
console.log(plaintextBob.toString("utf8"));
// Hello Node.TLV

assert.deepStrictEqual(plaintext, plaintextBob);

function loadKey() {
  return Buffer.from("HsA4VwRroJU/R9lWryEWGPM8aAMgCGaqaHbP7Sy24zA", "base64");
}
