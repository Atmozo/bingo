// Navbar.tsx

import { Link } from "react-router-dom";
import { FaHome, FaUserFriends, FaGlobe, FaRobot } from "react-icons/fa"; // Import icons

const Navbar = () => (
  <nav className="bg-black bg-opacity-70 p-4 border-2 border rounded-[3%] animate-border-blink">
    <ul className="flex justify-around text-white">
      <li>
        <Link to="/" className="flex flex-col items-center hover:text-blue-300 ">
          <FaHome className="text-xl" />
          <span className="text-sm">Home</span>
        </Link>
      </li>
      <li>
        <Link to="/local" className="flex flex-col items-center hover:text-blue-300">
          <FaUserFriends className="text-xl" />
          <span className="text-sm">Local</span>
        </Link>
      </li>
      <li>
        <Link to="/online" className="flex flex-col items-center hover:text-blue-300">
          <FaGlobe className="text-xl" />
          <span className="text-sm">Online</span>
        </Link>
      </li>
      <li>
        <Link to="/ai" className="flex flex-col items-center hover:text-blue-300">
          <FaRobot className="text-xl" />
          <span className="text-sm">AI</span>
        </Link>
      </li>
    </ul>
  </nav>
);

export default Navbar;
