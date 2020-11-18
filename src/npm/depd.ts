// https://www.npmjs.com/package/depd

export default function depd (_namespace: string) {
  function deprecate () { }
  deprecate.function = (fn: any) => fn
  deprecate.property = () => {}
  return deprecate
}
