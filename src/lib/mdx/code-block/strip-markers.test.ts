import { stripMarkers } from './strip-markers'

// TODO: add vitest
// Test the function with various examples
const testCases = [
  {
    name: 'Simple remove marker',
    input: `// [!code --]
import { add } from './add'
import { add } from './add.ts'`,
    expected: `import { add } from './add.ts'`,
  },
  {
    name: 'Basic remove and add markers',
    input: `// [!code --]
import { add } from './add'
// [!code ++]
import { add } from './add.ts'
const { A, B } = require('./constants')

console.log(\`\${A} + \${B} = \${add(A, B)}\`)`,
    expected: `import { add } from './add.ts'
const { A, B } = require('./constants')

console.log(\`\${A} + \${B} = \${add(A, B)}\`)`,
  },
  {
    name: 'Remove multiple lines',
    input: `// [!code --:3]
import { add } from './add'
import { subtract } from './subtract'
import { multiply } from './multiply'
// [!code ++]
import { add } from './add.ts'
const { A, B } = require('./constants')`,
    expected: `import { add } from './add.ts'
const { A, B } = require('./constants')`,
  },
  {
    name: 'Focus marker',
    input: `// [!code focus:1]
import { add } from './add'
const { A, B } = require('./constants')`,
    expected: `import { add } from './add'
const { A, B } = require('./constants')`,
  },
]

testCases.forEach(({ name, input, expected }) => {
  console.log(`\n=== ${name} ===`)
  console.log('Input:')
  console.log(input)
  console.log('\nExpected:')
  console.log(expected)
  console.log('\nActual:')
  const result = stripMarkers(input)
  console.log(result)
  console.log('\nMatch:', result === expected ? '✅' : '❌')
})
