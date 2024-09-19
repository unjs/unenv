import process from "node:process";

globalThis.Buffer = process.getBuiltinModule("buffer").Buffer;

export const cryptoTests = {
  async test(ctrl, env, ctx) {
    const crypto = await import("node:crypto");
    crypto.randomBytes(10);
  },
};
