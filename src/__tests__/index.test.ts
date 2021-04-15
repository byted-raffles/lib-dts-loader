import path from 'path';
import webpack from 'webpack';
import memoryfs from 'memory-fs';

test('Basic', async () => {
    const stats = await compiler('basic.ts');
    const output = stats.toJson().modules[0].source;

    expect(output).toBe('');
});

function compiler(fixture, options = {}) {
    const compiler = webpack({
        context: __dirname,
        entry: `./${fixture}`,
        output: {
            path: path.resolve(__dirname),
            // filename: 'bundle.js',
        },
        module: {
            rules: [{
                test: /\.tsx?$/,
                use: {
                    loader: 'ts-loader',
                }
            }]
        }
    });

    compiler.outputFileSystem = new memoryfs();

    return new Promise((resolve, reject) => {
        compiler.run((err, stats) => {
            if (err) reject(err);

            resolve(stats);
        });
    });
}
