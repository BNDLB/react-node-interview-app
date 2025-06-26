module.exports = {
  root: false, // Use root configuration
  extends: [
    '../.eslintrc.js',
  ],
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['dist', 'node_modules'],
  rules: {
    'no-console': 'off', // Server can use console for logging
  },
};
