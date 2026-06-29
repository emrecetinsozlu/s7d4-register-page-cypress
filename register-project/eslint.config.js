import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'
import cypressPlugin from 'eslint-plugin-cypress'; 

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      // 2. Add Cypress globals so ESLint recognizes 'cy'
        ...cypressPlugin.environments.globals, 
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: {
      cypress: cypressPlugin,
    },
    // 4. Turn on the recommended Cypress rules
     rules: {
      ...cypressPlugin.configs.recommended.rules,
    },
  },
])
