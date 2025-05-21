// This configuration file is for Vitest, a testing framework for Vite projects.
// It uses the 'defineConfig' helper from 'vitest/config' to define the configuration.
// The 'vite-tsconfig-paths' plugin is included to allow Vite to resolve TypeScript path aliases as defined in tsconfig.json.
// The 'test' property configures how Vitest runs tests:
// - 'environment: jsdom' means tests will run in a browser-like environment (using jsdom).
// - 'exclude' specifies patterns for files and folders that should not be included in the test run (node_modules and e2e).
// - 'deps.inline' tells Vitest to inline the 'wagmi' and '@wagmi/core' dependencies during testing, which can help with compatibility.

import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    plugins: [tsconfigPaths()],
    test: {
        environment: 'jsdom',
        exclude: ['**/node_modules/**', '**/e2e/**'],
        deps: {
            inline: ['wagmi', '@wagmi/core']
        }
    },
})