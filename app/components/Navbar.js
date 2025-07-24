import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full px-6 py-4 flex justify-between items-center bg-white shadow">
      <div className="text-lg font-bold">LOGO</div>
      <ul className="flex space-x-8 text-sm font-medium">
        <li className="font-bold hover:text-gray-700 cursor-pointer">
          <Link href="/">Home</Link>
        </li>
        <li className="font-bold hover:text-gray-700 cursor-pointer">
          <Link href="/explore">Explore</Link>
        </li>
        <li className="font-bold hover:text-gray-700 cursor-pointer">
          <Link href="/game">Games</Link>
        </li>
      </ul>
    </nav>
  );
}
