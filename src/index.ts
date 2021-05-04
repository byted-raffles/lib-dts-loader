import { getOptions } from 'loader-utils';
// import * as path from 'path';
// import { bundle } from 'dts-bundle';

// bundle({
//   name: 'lodash',
//   out: path.resolve(__dirname, 'lodash.d.ts'),
//   main: path.resolve(__dirname, '../node_modules/@types/lodash/index.d.ts'),
// });

// bundle({
//   name: 'prettier',
//   out: path.resolve(__dirname, 'prettier.d.ts'),
//   main: path.resolve(__dirname, '../node_modules/@types/prettier/standalone.d.ts'),
// });

// export = async function LibDTSLoader() {
//
// };

export default function loader(source) {
  console.log(11111111);
  const options = getOptions(this);

  source = source.replace(/\[name]/g, options.name);

  return `export default ${ JSON.stringify(source) }`;
}
