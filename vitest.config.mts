import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Restrict discovery to the source tree so stray copies of the repo
    // (e.g. git worktrees under .claude/) are never picked up.
    include: ["src/**/*.test.ts"],
    environment: "node",
  },
});
