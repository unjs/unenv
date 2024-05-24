export default Object.freeze(
  Object.create({
    __unenv__: { get: () => true },
    [Symbol.dispose]: function () {
      return Promise.resolve();
    },
  }),
);
