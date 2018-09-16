module.exports = {
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
    },
  },
  env: {
    browser: true,
  },
  extends: ['airbnb-base', 'plugin:vue/essential'],
  rules: {
    'max-len': ['error', { code: 80 }],
  },
};
