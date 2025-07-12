// [!code --]
const { add } = require('./add.ts')
const { A, B } = require('./constants.ts')

// [!code --]
console.log(`${A} + ${B} = ${add(A, B)}`)
// [!code ++:3]
import('./add.ts').then(({ add }) => {
    console.log(`${A} + ${B} = ${add(A, B)}`)
})
