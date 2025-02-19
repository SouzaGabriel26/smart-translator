import viteTsConfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [viteTsConfigPaths()],
  test: {
    globals: true,
    typecheck: {
      enabled: true,
    },
  },
});
