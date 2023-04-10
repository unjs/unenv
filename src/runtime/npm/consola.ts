import mock from "../mock/proxy";

export const consola = mock.__createMock__("consola", {
  ...console,
});

export default consola;
