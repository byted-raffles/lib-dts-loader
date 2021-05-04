import webpack, { Stats } from 'webpack';
import MemoryFS from 'memory-fs';
import path from 'path';

const loaderPath = path.resolve(__dirname, '../index.ts');

export default async function compile(entry: string): Promise<{ result: string; stats: Stats }> {
  const compiler = webpack({
    resolveLoader: {
      alias: {
        'lib-dts-loader': loaderPath,
      },
    },
    mode: 'development',
    entry,
    output: {
      path: '/',
    },
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
