import type nodeOs from "node:os";
import osConstants from "../constants/os.ts";

export const constants: typeof nodeOs.constants = {
  ...osConstants,
};
