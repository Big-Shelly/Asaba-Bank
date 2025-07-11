import Link from 'next/link';
export default function Navbar() {
  return (
    <header className="bg-white fixed top-0 w-full z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="h-10">
          <img src="/logo.png" alt="AsabaBank" className="h-10"/>
        </Link>
        <nav className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <Link href="/banking">Banking</Link>
          <Link href="/pay-ring">Pay Ring</Link>
          <Link href="/mortgages">Mortgages</Link>
          <Link href="/about">About</Link>
        </nav>
        <div className="hidden md:block">
          <Link href="/auth/login" className="px-4 py-2 text-indigo-600 border border-indigo-600 rounded hover:bg-indigo-600 hover:text-white transition">
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}
