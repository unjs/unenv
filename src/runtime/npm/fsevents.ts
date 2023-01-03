// https://www.npmjs.com/package/fsevents

export default {
  watch (_dir: string, _cb: (...args: any[]) => any) {
    return Promise.resolve();
  },
  getInfo (path: string, _flags: number, _id: string) {
    return {
      event: "mock",
      path,
      type: "file",
      flags: 0x1_00_00_00_00,
      changes: {
        inode: false,
        finder: false,
        access: false,
        xattrs: false
      }
    };
  }
};
