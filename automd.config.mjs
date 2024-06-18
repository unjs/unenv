export default {
  input: ["README.md"],
  generators: {
    nodeCoverage: {
      name: "node-coverage",
      async generate(ctx) {
        const { makeCoverage } = await import("./test/node-coverage.mjs");
        const coverage = await makeCoverage();
        const contents = coverage
          .map((module) => {
            const supported = module.supportedExports.length;
            const unsupported = module.unsupportedExports.length;
            const all = supported + module.unsupportedExports.length;
            const status =
              supported === 0
                ? " - 🚧 mocked using proxy "
                : ` - ✅ polyfilled ${unsupported ? `${supported}/${all} exports` : "all exports"} `;
            const url = `https://nodejs.org/api/${module.name.split("/")[0]}.html`;
            return `- [node:${module.name}](${url}) ${status}`;
          })
          .join("\n");
        return {
          contents,
        };
      },
    },
  },
};
