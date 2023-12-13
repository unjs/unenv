import { env, nodeless, deno } from "../src";

const denoConfig = env(nodeless, deno);

console.log(denoConfig);
