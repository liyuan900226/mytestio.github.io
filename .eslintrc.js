module.exports = {
  root: true,
  env: {
    node: true,
  },
  globals: {
    AMap: "readonly",
    AMapUI: "readonly"
  },
  extends: ['plugin:vue/essential', 'eslint:recommended',
      // '@vue/prettier'
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    // 生产环境禁用console和debugger
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 'prettier/prettier': [
    //   'error',
    //   {
    //     singleQuote: true,
    //     semi: true,
    //     trailingComma: 'all',
    //     bracketSpacing: true,
    //   },
    // ],
    // 禁止使用 alert、confirm、prompt
    'no-alert': 'error',
    // 禁止使用 var 关键字声明变量
    'no-var': 'error',
    // switch 语句最后必须有 default
    'default-case': 'error',
    // 禁止行内注释
    'no-inline-comments': 'error',
    'line-comment-position': ['error', { position: 'above' }],
    // 注释后增加空格
    'spaced-comment': ['error', 'always'],
    // if while function 后面的 { 一定要和 if 在同一行
    'brace-style': ['error', '1tbs'],
    // 空白行最多不超过两行
    'no-multiple-empty-lines': ['error', { max: 2 }],
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
