import pluginVue from 'eslint-plugin-vue'
import * as tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import pluginOxlint from 'eslint-plugin-oxlint'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import vueParser from 'vue-eslint-parser'

export default [
  // 1. Global ignores
  {
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  // 2. Spread the entire 'flat/vue3-recommended' preset.
  // This is an array of configs that sets up the parser and base rules for Vue.
  ...pluginVue.configs['flat/vue2-recommended'],

  // 3. Configuration for TypeScript files (non-Vue)
  {
    files: ['**/*.{ts,mts,tsx}'],
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    languageOptions: {
      parser: tsParser,
    },
    rules: {
      // The `.rules` property exists here because `recommended` is a single object, not an array.
      ...tsPlugin.configs['recommended'].rules,
    },
  },

  // 4. Add your own custom rules and overrides for Vue files.
  // This block comes *after* the recommended preset to ensure it takes precedence.
  {
    files: ['**/*.vue'], // Apply these rules only to Vue files
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        sourceType: 'module',
      },
    },
    rules: {
      // --- THE CRITICAL FIX FOR THE ORIGINAL PROBLEM ---
      // This rule understands variables used inside the <template>.
      'vue/script-setup-uses-vars': 'error',

      // We use the TypeScript-aware version of the no-unused-vars rule.
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',

      // Your personal overrides
      'vue/multi-word-component-names': 'off',
    },
  },

  // 5. Add Oxlint and Prettier skipping to all relevant files
  {
    files: ['**/*.{ts,mts,tsx,vue}'],
    ...pluginOxlint.configs['flat/recommended'],
    ...skipFormatting,
  }
]
