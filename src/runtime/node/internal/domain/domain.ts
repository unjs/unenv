import { createNotImplementedError } from "../../../_internal/utils.ts";
import { EventEmitter } from "node:events";
import type nodeDomain from "node:domain";

export class Domain extends EventEmitter implements nodeDomain.Domain {
  readonly __unenv__ = true;

  members = [];
  add() {}
  enter() {}
  exit() {}
  remove() {}
  bind<T>(callback: T): T {
    throw createNotImplementedError("Domain.bind");
  }
  intercept<T>(callback: T): T {
    throw createNotImplementedError("Domain.intercept");
  }
  run<T>(fn: (...args: any[]) => T, ...args: any[]): T {
    throw createNotImplementedError("Domain.run");
  }
}
