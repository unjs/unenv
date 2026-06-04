import { describe, expect, it } from "vitest";
import { EventEmitter } from "../src/runtime/node/events.ts";

describe("node:events EventEmitter", () => {
  it("can be invoked without `new` to initialize `this` (unjs/unenv#552)", () => {
    // Prototypal inheritance pattern used by `readable-stream`, `N3.js`, etc.
    function MyStream(this: any) {
      EventEmitter.call(this);
    }
    Object.setPrototypeOf(MyStream.prototype, EventEmitter.prototype);
    Object.setPrototypeOf(MyStream, EventEmitter);

    const stream = new (MyStream as any)();
    expect(stream).toBeInstanceOf(EventEmitter);

    let received: unknown;
    stream.on("data", (d: unknown) => {
      received = d;
    });
    expect(stream.listenerCount("data")).toBe(1);
    stream.emit("data", 42);
    expect(received).toBe(42);
  });

  it("initializes a plain object passed as the receiver via `.call`", () => {
    const obj: any = {};
    const result = (EventEmitter as any).call(obj);
    // Like Node, the init runs against (and returns) the provided receiver.
    expect(result).toBe(obj);
    expect(EventEmitter.prototype.listenerCount.call(obj, "x")).toBe(0);
  });

  it("throws like Node when invoked with no receiver", () => {
    // Node's `EventEmitter` is strict-mode, so a bare `EventEmitter()` call has
    // `this === undefined` and throws while reading `this._events`. The polyfill
    // mirrors this exactly rather than silently returning a new instance.
    const callWithoutReceiver = EventEmitter as unknown as () => void;
    expect(() => callWithoutReceiver()).toThrow(TypeError);
  });

  it("still works when constructed with `new`", () => {
    const ee = new EventEmitter();
    expect(ee).toBeInstanceOf(EventEmitter);

    let count = 0;
    ee.on("ping", () => count++);
    ee.emit("ping");
    ee.emit("ping");
    expect(count).toBe(2);
  });

  it("works as an ES class superclass", () => {
    class Sub extends EventEmitter {}
    const sub = new Sub();
    expect(sub).toBeInstanceOf(EventEmitter);

    let hit = false;
    sub.on("go", () => (hit = true));
    sub.emit("go");
    expect(hit).toBe(true);
  });

  it("exposes static members through the callable wrapper", () => {
    expect(EventEmitter.defaultMaxListeners).toBe(10);
    expect(typeof EventEmitter.once).toBe("function");
    expect(typeof EventEmitter.on).toBe("function");
    expect(EventEmitter.EventEmitter).toBe(EventEmitter);
  });
});
