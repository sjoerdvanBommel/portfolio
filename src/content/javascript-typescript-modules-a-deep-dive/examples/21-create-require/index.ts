{
    "modifiedType": "unmodified"
}
-----
// [!code highlight]
import { createRequire } from 'module';
import { add } from './add.ts';

// [!code highlight:2]
const require = createRequire(import.meta.url);
const { A, B } = require('./constants.cts');

console.log(`${A} + ${B} = ${add(A, B)}`);  