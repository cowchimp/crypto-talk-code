import crypto, { X509Certificate } from "crypto";
import fs, { readFile } from "fs/promises";
import assert from "assert";

const aliceCert = new crypto.X509Certificate(await fs.readFile("alice.cer"));
console.log(aliceCert.subject);
console.log(aliceCert.issuer);
console.log(`${aliceCert.validFrom} - ${aliceCert.validTo}`);
const carolCert = new X509Certificate(await readFile("carol.cer"));
const isVerified = aliceCert.verify(carolCert.publicKey);
console.log({ isVerified });

assert.equal(isVerified, true);
