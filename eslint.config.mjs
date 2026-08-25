import { defineConfig } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

import jest from "eslint-plugin-jest";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([
    {
        ignores: ["infra/migrations/**/*"],
    },
    {
        extends: [...compat.extends("eslint:recommended"), ...nextCoreWebVitals],
    },
    {
        files: ["tests/**/*", "**/*.test.js", "**/*.spec.js"],
        ...jest.configs["flat/recommended"],
    }
]);