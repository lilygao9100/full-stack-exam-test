import React, { ReactNode } from 'react'
import Link from 'next/link';

// Interface defining the properties accepted by the Layout component
interface LayoutProps {
  children: ReactNode
}

/**
 * Layout Component
 * Provides a consistent page structure including header, main content area, and footer.
 * Can be reused across multiple pages to maintain design consistency.
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <header className="bg-custom-header-purple text-black p-6 flex justify-between items-center">
        {/* Left: Title */}
        <h1 className="text-4xl font-bold italic pl-4">Teach Team</h1>

        {/* Center: Logo */}
        <img src="/Images/logo.png" alt="TT Web System Logo" className="h-14" />

        {/* Right: Navigation links */}
        <nav>
          <ul className="flex space-x-4 text-lg font-semibold pr-8">
          <li>
            <Link href="/" className="text-lg font-semibold">About</Link>
          </li>
          <li>
            <Link href="/login" className="text-lg font-semibold">Login</Link>
          </li>
          <li>
            <Link href="/signup" className="text-lg font-semibold">Sign Up</Link>
          </li>
          <li>
            <Link href="/signout" className="text-lg font-semibold">Log out</Link>
          </li>
          </ul>
        </nav>
      </header>

      {/* Main content area */}
      <main className="flex-grow">
        {children}
      </main>
            
      {/* Footer */}
      <footer className="bg-custom-header-purple text-black p-4 text-center">
        <p>&copy; 2025 TT Web System. All rights reserved.</p>
        <p>Authors: Zan Xu & Yiqun Gao </p>
      </footer>
    </div>
  )
}

export default Layout
