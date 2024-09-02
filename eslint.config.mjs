import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginCypress from 'eslint-plugin-cypress/flat'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default [
  {
    languageOptions: { globals: globals.browser },
    plugins: {
      cypress: pluginCypress,
    },
  },
  pluginJs.configs.recommended,
  pluginCypress.configs.recommended,
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
  {
    rules: {
      'prettier/prettier': 'warn',
    },
  },
]
