module.exports = {
  root: true,
  extends: ['doctolib', 'doctolib/react'],
  env: {
    jest: true,
  },
  rules: {
    'react/sort-comp': 'off',
    'react/no-unescaped-entities': 'off',
    'react/jsx-wrap-multilines': 'off',
  },
}
