import { createDiffieHellman } from "crypto";
import assert from "assert";

// alice's side
const alice = createDiffieHellman(2048);
const prime = alice.getPrime();
const generator = alice.getGenerator();
const alicePublicKey = alice.generateKeys();
console.log({
  prime: prime.toString("base64"),
  generator: generator.toString("base64"),
  alicePublicKey: alicePublicKey.toString("base64"),
});

// bob's side
const bob = createDiffieHellman(prime, generator);
const bobPublicKey = bob.generateKeys();
console.log({ bobPublicKey: bobPublicKey.toString("base64") });
const bobSecretKey = bob.computeSecret(alicePublicKey);
console.log(bobSecretKey.toString("base64"));

// alice's side
const aliceSecretKey = alice.computeSecret(bobPublicKey);
console.log(aliceSecretKey.toString("base64"));

assert.deepStrictEqual(bobSecretKey, aliceSecretKey);
