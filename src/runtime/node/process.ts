// https://nodejs.org/api/process.html
import type nodeProcess from "node:process";

import { process as unenvProcess } from "./internal/process/process";

export * from "./internal/process/process";

export default unenvProcess as unknown as typeof nodeProcess;
