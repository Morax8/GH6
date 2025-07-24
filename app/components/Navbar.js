export default function Navbar() {
  return (
    <nav className="w-full px-6 py-4 flex justify-between items-center bg-white shadow">
      <div className="text-lg font-bold">LOGO</div>
      <ul className="flex space-x-8 text-sm font-medium">
        <li className="font-bold font hover:text-gray-700 cursor-pointer">
          Home
        </li>
        <li className="font-bold  hover:text-gray-700 cursor-pointer">
          Explore
        </li>
        <li className="font-bold  hover:text-gray-700 cursor-pointer">Games</li>
      </ul>
    </nav>
  );
}
