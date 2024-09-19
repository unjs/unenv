import crypto from "node:crypto";
import process from "node:process";

globalThis.Buffer = process.getBuiltinModule("buffer").Buffer;

export const cryptoTests = {
  async test(ctrl, env, ctx) {
    crypto.randomBytes(10);
  },
};
