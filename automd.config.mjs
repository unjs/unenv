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
            const statusIcon =
              module.supportedExports.length === 0 ||
              module.unsupportedExports.length > 0
                ? "🚧"
                : "✅";
            const comments =
              module.unsupportedExports.length > 0
                ? ` <!-- missing ${module.unsupportedExports.join(", ")} exports -->`
                : "";
            const url = `https://nodejs.org/api/${module.name.split("/")[0]}.html`;
            return `- ${statusIcon} [node:${module.name}](${url})${comments}`;
          })
          .join("\n");
        return {
          contents,
        };
      },
    },
  },
};
