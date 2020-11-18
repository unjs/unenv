function createMock (name: string, overrides: any = {}): any {
  const fn = function () { }
  fn.prototype.name = name
  const props: any = {}
  return new Proxy(fn, {
    get (_target, prop) {
      if (prop === 'caller') { return null }
      if (prop === '__createMock__') { return createMock }
      if (prop in overrides) { return overrides[prop] }
      // @ts-ignore
      return (props[prop] = props[prop] || createMock(`${name}.${prop.toString()}`))
    },
    apply (_target, _this, _args) {
      return createMock(`${name}()`)
    },
    construct (_target, _args, _newT) {
      return createMock(`[${name}]`) as Object
    },
    enumerate (_target) {
      return []
    }
  })
}

export default createMock('mock')
