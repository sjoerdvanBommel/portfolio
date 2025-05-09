import { useState } from 'react'
import { navigateToUrl } from 'single-spa'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <p>REACT</p>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <a href="/" onClick={navigateToUrl}>Go to root</a>
        <a href="/react" onClick={navigateToUrl}>Go to react</a>
        <a href="/svelte" onClick={navigateToUrl}>Go to svelte</a>
      </div>
    </>
  )
}

export default App
