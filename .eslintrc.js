module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
  },
  env: {
    browser: true,
    jest: true,
  },
  extends: ['airbnb-base', 'plugin:vue/essential'],
  rules: {
    'max-len': ['error', { code: 80 }],
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
  },
};
