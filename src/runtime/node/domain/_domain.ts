import { notImplemented } from "../../_internal/utils";
import noop from "../../mock/noop";
import { EventEmitter } from "../events";
import type domain from "node:domain";

// eslint-disable-next-line unicorn/prefer-event-target
export class Domain extends EventEmitter implements domain.Domain {
  readonly __unenv__ = true;

  members = [];
  add = noop;
  enter = noop;
  exit = noop;
  remove = noop;
  bind = notImplemented("Domain.bind");
  intercept = notImplemented("Domain.bind");
  run = notImplemented("Domain.bind");
}
