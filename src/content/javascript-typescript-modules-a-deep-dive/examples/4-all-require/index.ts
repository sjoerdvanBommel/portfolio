// [!code --:2]
import { add } from './add.ts'
import { A, B } from './constants.ts'
// [!code ++:2]
const { add } = require('./add.ts')
const { default: constants } = require('./constants.ts')

// [!code --]
console.log(`${A} + ${B} = ${add(A, B)}`)
// [!code ++]
console.log(`${constants.A} + ${constants.B} = ${add(constants.A, constants.B)}`)