// [!code --:2]
const { add } = require('./add.ts')
const { A, B } = require('./constants.ts')
// [!code ++:2]
import { add } from './add.ts'
import constants from './constants.ts'

console.log(`${constants.A} + ${constants.B} = ${add(constants.A, constants.B)}`)