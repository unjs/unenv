const mock = require('../mock/proxy')

module.exports = mock.__createMock__('consola', {
  ...console
})
