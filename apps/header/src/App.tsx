import { useState } from "react";
import { Link } from "@sjoerdvanbommel-packages/react-components";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
      <header className="flex justify-center">
    <div className="flex-1 mx-auto py-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-gray-900">Sjoerd van Bommel</Link>
          
          <button onClick={() => setIsOpen(!isOpen)} id="mobile-menu-button" className="md:hidden focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        
        <nav id="navigation" className={`${isOpen ? 'block' : 'hidden'} md:block mt-4 md:mt-0`}>
          <ul className="flex flex-col md:flex-row gap-2 md:gap-8">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About me</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
  )
}

export default App
