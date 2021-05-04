import fs from 'fs';
import { promisify } from 'util';

export const aReadFile = promisify(fs.readFile);
