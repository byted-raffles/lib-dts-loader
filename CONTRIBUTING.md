CONTRIBUTING GUIDE
===

## HOW TO

1. 在 `src/index.ts` 文件中进行开发

1. 在 `src/__tests__/cases/` 目录中编写测试用例

  + `*.ts` 为编译入口
  + `*.output.js` 为正确的编译结果

1. 在 `src/__tests__/` 目录中编写测试脚本, 命名格式 `*.test.ts`

1. `npm t` 执行测试

## TODOs

- [x] lint (use `lint-staged`)

## SEE

+ [webpack 官方 loader 编写指南](https://www.webpackjs.com/contribute/writing-a-loader/)
+ [Homepage - DTSBundle](https://github.com/TypeStrong/dts-bundle)
