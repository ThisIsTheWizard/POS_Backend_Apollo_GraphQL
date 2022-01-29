module.exports = {
  parser: 'babel-eslint',
  extends: ['prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error'],
    'no-underscore-dangle': 'off',
    'arrow-body-style': ['error', 'as-needed'],
    'no-unneeded-ternary': 'off',
    'no-unused-vars': 'error',
    'prefer-const': 'error',
    'one-var': ['error', { const: 'never' }],
    'object-shorthand': 'error'
  },
  overrides: [
    {
      files: ['*.model.js'],
      rules: {
        'no-use-before-define': 'off'
      }
    },
    {
      files: ['*.schema.js'],
      rules: {
        'no-undefined': 'off'
      }
    },
    {
      files: ['*.test.js'],
      rules: {
        'max-lines-per-function': 'off',
        'no-undef': 'off'
      }
    },
    {
      files: ['api-request-for*.js'],
      rules: {
        'max-lines-per-function': 'off'
      }
    }
  ]
}
