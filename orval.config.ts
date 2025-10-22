import { defineConfig } from "orval";

export default defineConfig({
  "nutri-ai": {
    input: {
      target: "./src/shared/api/schema.yml",
    },
    output: {
      target: "./src/shared/api/generated",
      client: "react-query",
      mock: true,
      clean: true,
      prettier: true,
      override: {
        mutator: {
          path: "./src/shared/api/api-instance.ts",
          name: "createInstance",
        },
      },
    },
    hooks: {
      afterAllFilesWrite: "prettier --write",
    },
  },
  server: {
    input: "./src/shared/api/schema.yml",
    output: {
      target: "./server/generated.ts",
      prettier: true,
    },
  },
});
