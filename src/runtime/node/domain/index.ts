import type domain from "node:domain";
import { Domain } from "./internal/domain";

export { Domain } from "./internal/domain";

export const create: typeof domain.create = function () {
  return new Domain();
};
export const createDomain: typeof domain.create = create;
const _domain = create();
export const active = () => _domain;
export const _stack = [];

export default <typeof domain>{
  Domain,
  _stack,
  active,
  create,
  createDomain,
};
