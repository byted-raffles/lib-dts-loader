import { getCurrentRequest } from 'loader-utils';
// import { bundle } from 'dts-bundle';

async function loader(dtsIndexPath: string) {
  // 在这里写 "dts 入口" -> "声明 bundle string" 的执行逻辑
  return `export default '${dtsIndexPath}';`;
}

// TODO
//   这种写法有个小问题, 就是会把 dts bundle 全文生成成一个字符串直接打到代码包里
//   使用者需要额外编写分包逻辑
export default function (/* source: string */) {
  const callback = this.async();
  const parts = getCurrentRequest(this).split('!');
  loader(parts[parts.length - 1]).then(code => callback(null, code));
}
