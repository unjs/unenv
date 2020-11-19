// https://www.npmjs.com/package/depd

module.exports = function depd (_namespace: string) {
  function deprecate () { }
  deprecate.function = (fn: any) => fn
  deprecate.property = () => {}
  return deprecate
}
