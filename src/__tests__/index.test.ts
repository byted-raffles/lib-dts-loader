import path from 'path';
import webpack, { Stats } from 'webpack';
import MemoryFS from 'memory-fs';

async function compile(): Promise<{ result: string; stats: Stats }> {
  const compiler = webpack({
    mode: 'development',
    entry: path.resolve(__dirname, 'constant/basic.ts'),
    output: {
      filename: 'bundle.js',
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

      const result = (compiler.outputFileSystem as MemoryFS).data['bundle.js'].toString();
      resolve({ result, stats });
    })
  })
}

(async function () {
  const { stats } = await compile();
  const output = stats.toJson().modules[0].source;
  console.log(output);
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
