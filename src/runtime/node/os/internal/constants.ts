import type os from "node:os";
import osConstants from "../../constants/iternal/os";

export const constants: typeof os.constants = {
  ...osConstants,
};
