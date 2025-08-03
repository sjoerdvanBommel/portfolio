import { createRequire } from 'module';
import { add } from './add.ts';

const require = createRequire(import.meta.url);
const { A, B } = require('./folder/constants');

console.log(`${A} + ${B} = ${add(A, B)}`);  