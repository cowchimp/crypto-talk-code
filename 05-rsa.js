import crypto from "crypto";
import fs from "fs/promises";
import assert from "assert";
import util from "util";
const generateKeyPair = util.promisify(crypto.generateKeyPair);

const { RSA_PKCS1_OAEP_PADDING } = crypto.constants;

// bob's side
const keyPair = await generateKeyPair("rsa", {
  modulusLength: 4096,
});
const publicKey = keyPair.publicKey.export({
  type: "spki",
  format: "pem",
});
await fs.writeFile("bob-public.pem", publicKey);
const privateKey = keyPair.privateKey.export({
  type: "pkcs8",
  format: "pem",
});
await fs.writeFile("bob-private.pem", privateKey);

// alice's side
const bobPublicKey = crypto.createPublicKey(
  await fs.readFile("bob-public.pem")
);
const plaintext = Buffer.from("Hello world!", "utf8");
const ciphertext = crypto.publicEncrypt(
  {
    key: bobPublicKey,
    padding: RSA_PKCS1_OAEP_PADDING,
  },
  plaintext
);
console.log({ ciphertext: ciphertext.toString("base64") });

// bob's side
const bobPrivateKey = crypto.createPrivateKey(
  await fs.readFile("bob-private.pem")
);
const plaintextBob = crypto.privateDecrypt(
  {
    key: bobPrivateKey,
    padding: RSA_PKCS1_OAEP_PADDING,
  },
  ciphertext
);

console.log(plaintextBob.toString("utf8"));
// Hello world!

assert.deepStrictEqual(plaintext, plaintextBob);
