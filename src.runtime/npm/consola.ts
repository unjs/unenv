import mock from '../mock/proxy'

export default mock.__createMock__('consola', {
  ...console
})
