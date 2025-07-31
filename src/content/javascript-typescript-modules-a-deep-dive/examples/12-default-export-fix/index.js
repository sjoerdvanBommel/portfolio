// [!code --]
import { default as defaultExport, A, B } from './constants.js';
// [!code ++:2]
import constants from './constants.js';
const { default: defaultExport, A, B } = constants;

console.log(defaultExport, A, B);