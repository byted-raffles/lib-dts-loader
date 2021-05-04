import webpack, { Stats } from 'webpack';
import MemoryFS from 'memory-fs';
import path from 'path';

const loaderPath = path.resolve(__dirname, '../index.ts');

export default async function compile(entry: string): Promise<{ result: string; stats: Stats }> {
  const compiler = webpack({
    // see: https://champyin.com/2020/01/04/webpack%E9%85%8D%E7%BD%AE%E6%9C%AC%E5%9C%B0loader%E7%9A%84%E5%87%A0%E7%A7%8D%E6%96%B9%E6%B3%95/
    resolveLoader: {
      alias: {
        'lib-dts-loader': loaderPath,
      },
    },
    mode: 'development',
    entry,
    module: {
      rules: [{
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
        },
      }],
    },
  });

  compiler.outputFileSystem = new MemoryFS();

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        return reject(err);
      }

      if (stats.hasErrors() || stats.hasWarnings()) {
        return reject(new Error(stats.toString({
          errorDetails: true,
          warnings: true,
        })));
      }

      const tarModule = stats.toJson().modules.find(m => m.identifier.includes(loaderPath));
      if (tarModule) {
        resolve({ result: tarModule.source, stats });
      } else {
        reject(new Error('Test code does not use lib-dts-loader!'));
      }
    });
  });
}
