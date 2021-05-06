// 用法说明: https://webpack.docschina.org/concepts/loaders/#inline
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore 因为 ts 不允许引用 dts 文件, 所以只能写一个 ignore 来强行引入
import loaderUtils from '!lib-dts-loader!@types/loader-utils/index.d.ts';

export default {
  loaderUtils,
};
