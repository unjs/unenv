// https://www.npmjs.com/package/fsevents

export default {
  watch(_dir: string, _cb: Function) {
    return Promise.resolve()
  },
  getInfo(path: string, _flags: number, _id: string) {
    return {
      event: 'mock',
      path: path,
      type: 'file',
      flags: 0x100000000,
      changes: {
        inode: false,
        finder: false,
        access: false,
        xattrs: false
      }
    }
  }
}
