import crypto from "crypto";
import fs, { readFile } from "fs/promises";
import assert from "assert";

const algorithm = "sha256";

// alice's side
const alicePrivateKey = crypto.createPrivateKey(
  await fs.readFile("alice-private.pem")
);
const message = Buffer.from("Bob has a ticket to Node.TLV", "utf8");
const signature = crypto.sign(algorithm, message, {
  key: alicePrivateKey,
});
console.log({
  message: message.toString("base64"),
  signature: signature.toString("base64"),
});

// bob's side
const alicePublicKey = crypto.createPublicKey(
  await readFile("alice-public.pem")
);
const isVerified = crypto.verify(
  algorithm,
  message,
  {
    key: alicePublicKey,
  },
  signature
);
console.log({ isVerified });
// isVerified: true

assert.equal(isVerified, true);
