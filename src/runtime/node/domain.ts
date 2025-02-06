import type domain from "node:domain";
import { Domain } from "./internal/domain/domain.ts";

export { Domain } from "./internal/domain/domain.ts";

export const create: typeof domain.create = function () {
  return new Domain();
};
export const createDomain: typeof domain.create = create;
const _domain = create();
export const active = () => _domain;
export const _stack = [];

export default {
  Domain,
  _stack,
  active,
  create,
  createDomain,
} as typeof domain;
