// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import antfu from '@antfu/eslint-config'


export default withNuxt(antfu(
  {
    files: ['**/*.vue'],
    rules: {
      'vue/require-v-for-key': ['off'],
      'vue/valid-v-for': ['off'],
      '@stylistic/indent': ['off'],
      'vue/singleline-html-element-content-newline': ['off'],
      'vue/max-attributes-per-line': ['error', {
        singleline: { max: 3 },
        multiline: { max: 2 }
      }]
    }
  },
  {
    rules: {
      "@stylistic/quotes": ["error", "double"],
      '@stylistic/comma-dangle': ['error', 'never'],
      '@typescript-eslint/no-explicit-any': ['off']
    }
  }
))
