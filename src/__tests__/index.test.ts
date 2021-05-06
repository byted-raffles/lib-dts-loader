import path from 'path';
import compile from './_compile';
import { aReadFile } from './_util';

// TODO 目前 case 执行比较糙, 后面调整
test('Basic', async () => {
  // 入是调用侧代码 (即包含 import '!lib-dts-loader!xxx.d.ts' 语句的文件)
  const { result } = await compile(path.resolve(__dirname, 'cases/basic.ts'));
  const resultExpect = await aReadFile(
    // 结果校验是被编译文件的编译产物 (即上文所述的 .d.ts 文件的编译产物)
    path.resolve(__dirname, 'cases/basic.output.js'),
    { encoding: 'utf-8' }
  );
  expect(result.trim()).toBe(resultExpect.trim());
});
