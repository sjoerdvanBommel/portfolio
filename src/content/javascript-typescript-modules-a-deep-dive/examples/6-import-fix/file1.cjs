// [!code --:3]
const { message } = require('./file2.mjs');

console.log(message);
// [!code ++:3]
import('./file2.mjs').then(({ message }) => {
  console.log(message)
})