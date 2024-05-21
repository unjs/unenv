// Make sure env polyfill won't fallback to legacy `globalThis` used for service-worker format
(globalThis as any).__env__ = {};
