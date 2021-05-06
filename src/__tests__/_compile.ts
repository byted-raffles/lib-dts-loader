/* eslint-disable node/no-unpublished-import */
import webpack, { Stats } from 'webpack';
import MemoryFS from 'memory-fs';
/* eslint-enable node/no-unpublished-import */
import path from 'path';

const LOADER_PATH = path.resolve(__dirname, '../index.ts');

export interface CompileOutcome {
  result: string;
  stats: Stats;
}

export default async function compile(entry: string): Promise<CompileOutcome> {
  const compiler = webpack({
    // see: https://champyin.com/2020/01/04/webpack%E9%85%8D%E7%BD%AE%E6%9C%AC%E5%9C%B0loader%E7%9A%84%E5%87%A0%E7%A7%8D%E6%96%B9%E6%B3%95/
    resolveLoader: {
      alias: {
        'lib-dts-loader': LOADER_PATH,
      },
    },
    mode: 'development',
    entry,
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: {
            loader: 'ts-loader',
          },
        },
      ],
    },
  });

  // 可以从这个 FS 里读取打包 bundle, 不过本次用不到
  compiler.outputFileSystem = new MemoryFS();

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        return reject(err);
      }

      if (stats.hasErrors() || stats.hasWarnings()) {
        return reject(
          new Error(
            stats.toString({
              errorDetails: true,
              warnings: true,
            })
          )
        );
      }

      // see: https://www.webpackjs.com/contribute/writing-a-loader/#%E6%B5%8B%E8%AF%95
      const tarModule = stats
        .toJson()
        .modules.find(m => m.identifier.includes(LOADER_PATH));
      if (tarModule) {
        resolve({ result: tarModule.source, stats });
      } else {
        reject(new Error('Test code does not use lib-dts-loader!'));
      }
    });
  });
}
