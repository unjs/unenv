import mock from "../mock/proxy.ts";
import type nodeHttp2 from "node:http2";
import { notImplemented } from "../_internal/utils.ts";
import { constants } from "./internal/http2/constants.ts";

export { constants } from "./internal/http2/constants.ts";

export const createSecureServer = /*@__PURE__*/ notImplemented<
  typeof nodeHttp2.createSecureServer
>("http2.createSecureServer");
export const createServer =
  /*@__PURE__*/ notImplemented<typeof nodeHttp2.createServer>(
    "http2.createServer",
  );
export const connect: typeof nodeHttp2.connect =
  /*@__PURE__*/ notImplemented("http2.connect");
export const performServerHandshake: typeof nodeHttp2.performServerHandshake =
  /*@__PURE__*/ notImplemented("http2.performServerHandshake ");

export const Http2ServerRequest: typeof nodeHttp2.Http2ServerRequest =
  mock.__createMock__("http2.Http2ServerRequest");
export const Http2ServerResponse: typeof nodeHttp2.Http2ServerResponse =
  mock.__createMock__("http2.Http2ServerResponse");

export const getDefaultSettings: typeof nodeHttp2.getDefaultSettings =
  function () {
    return Object.create({
      headerTableSize: 4096,
      enablePush: true,
      initialWindowSize: 65_535,
      maxFrameSize: 16_384,
      maxConcurrentStreams: 4_294_967_295,
      maxHeaderSize: 65_535,
      maxHeaderListSize: 65_535,
      enableConnectProtocol: false,
    });
  };

export const getPackedSettings: typeof nodeHttp2.getPackedSettings =
  function () {
    return Buffer.from("");
  };

export const getUnpackedSettings: typeof nodeHttp2.getUnpackedSettings =
  function () {
    return Object.create({});
  };

export const sensitiveHeaders: typeof nodeHttp2.sensitiveHeaders = Symbol(
  "nodejs.http2.sensitiveHeaders",
);

export default {
  constants,
  createSecureServer,
  createServer,
  Http2ServerRequest,
  Http2ServerResponse,
  connect,
  getDefaultSettings,
  getPackedSettings,
  getUnpackedSettings,
  performServerHandshake,
  sensitiveHeaders,
} satisfies typeof nodeHttp2;
