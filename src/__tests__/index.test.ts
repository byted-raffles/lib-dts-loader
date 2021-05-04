import path from 'path';
import compile from './_compile';
import { aReadFile } from './_util';

test('Basic', async () => {
  const { result } = await compile(path.resolve(__dirname, 'cases/basic.ts'));
  const resultExpect = await aReadFile(path.resolve(__dirname, 'cases/basic.output.js'), { encoding: 'utf-8' });
  expect(result.trim()).toBe(resultExpect.trim());
});
