import { add } from './add.ts'
// [!code --]
const { A, B } = require('./constants')
// [!code ++]
import { A, B } from './constants.ts'

console.log(`${A} + ${B} = ${add(A, B)}`)