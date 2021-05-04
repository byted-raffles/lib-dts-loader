import path from 'path';
import webpack, { Stats } from 'webpack';
import MemoryFS from 'memory-fs';

const loaderPath = path.resolve(__dirname, '../index.ts');

async function compile(entry: string): Promise<{ result: string; stats: Stats }> {
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

(async function () {
  const { result } = await compile(path.resolve(__dirname, 'constant/basic.ts'));
  console.log(result);
}());

// import path from 'path';
// import webpack from 'webpack';
// import memoryfs from 'memory-fs';
//
// const outputDir = path.resolve(__dirname, '../../dist/');
//
// test('Basic', async () => {
//   const stats = await compiler(path.resolve(__dirname, 'constant', 'basic.ts'));
//   const output = stats.toJson().modules[0].source;
//
//   expect(output).toBe('');
// });
//
// function compiler(fixture, options = {}) {
//   const compiler = webpack({
//     // resolveLoader: {
//     //   alias: {
//     //     'lib-dts-loader': '',
//     //   },
//     // },
//     context: __dirname,
//     entry: fixture,
//     output: {
//       path: path.resolve(outputDir),
//       // filename: 'bundle.js',
//     },
//     module: {
//       rules: [{
//         test: /\.tsx?$/,
//         use: {
//           loader: 'ts-loader',
//         }
//       }]
//     }
//   });
//
//   compiler.outputFileSystem = new memoryfs();
//
//   return new Promise((resolve, reject) => {
//     compiler.run((err, stats) => {
//       if (err) reject(err);
//
//       resolve(stats);
//     });
//   });
// }
