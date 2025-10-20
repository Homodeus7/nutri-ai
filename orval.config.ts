import { defineConfig } from 'orval';

export default defineConfig({
  'nutri-ai': {
    input: {
      target: './src/shared/api/schema.yml',
    },
    output: {
      mode: 'tags-split',
      target: './src/shared/api/generated',
      schemas: './src/shared/api/generated/model',
      client: 'react-query',
      mock: false,
      clean: true,
      prettier: true,
      override: {
        mutator: {
          path: './src/shared/api/axios-instance.ts',
          name: 'customInstance',
        },
        query: {
          useQuery: true,
          useInfinite: false,
          useInfiniteQueryParam: 'nextId',
          options: {
            staleTime: 10000,
          },
        },
      },
    },
    hooks: {
      afterAllFilesWrite: 'prettier --write',
    },
  },
});
