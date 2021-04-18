import * as path from 'path';
import { bundle } from 'dts-bundle';

bundle({
  name: 'fxxk',
  out: path.resolve(__dirname, 'dist'),
  main: path.resolve(__dirname, '../node_modules/@types/lodash/index.d.ts'),
});

// export = async function LibDTSLoader() {
//
// };
