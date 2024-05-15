import { nextTick } from "node:process";
import { process as _process } from "../node/process/_process";

Object.assign(_process, { nextTick });
