import type nodeDomain from "node:domain";
import { Domain } from "./internal/domain/domain.ts";

export { Domain } from "./internal/domain/domain.ts";

export const create: typeof nodeDomain.create = function () {
  return new Domain();
};
export const createDomain: typeof nodeDomain.create = create;
const _domain = create();
export const active = () => _domain;
export const _stack = [];

export default {
  Domain,
  _stack,
  active,
  create,
  createDomain,
} as /* TODO: use satisfies */ typeof nodeDomain;
