import crypto from "crypto";
import util from "util";
const randomBytes = util.promisify(crypto.randomBytes);
const randomFill = util.promisify(crypto.randomFill);
const randomInt = util.promisify(crypto.randomInt);

const buffer1 = await randomBytes(4);
console.log(buffer1.toString("hex"));

const buffer2 = Buffer.alloc(4);
await randomFill(buffer2, 2, 1);
console.log(buffer2.toString("hex"));

const int = await randomInt(18, 180);
console.log(int);

const uuid = crypto.randomUUID();
console.log("uuid", uuid);
