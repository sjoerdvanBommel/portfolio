// [!code --:2]
import { add } from './add.ts'
import { A, B } from './contants.ts'
// [!code ++:2]
const { add } = require('./add.ts')
const { A, B } = require('./constants.ts')

console.log(`${A} + ${B} = ${add(A, B)}`)