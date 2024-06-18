// https://nodejs.org/api/process.html
import type nodeProcess from "node:process";

import { process as unenvProcess } from "./internal/process";

export * from "./internal/process";

export default unenvProcess satisfies typeof nodeProcess;
