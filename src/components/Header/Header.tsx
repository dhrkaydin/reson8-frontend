import { useState } from 'react';
import { FaBars } from 'react-icons/fa'; // For the hamburger icon
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isSessionActive, setIsSessionActive] = useState<boolean>(true); // Simulating active session

  // Toggle the hamburger menu
  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-resonBlue grid grid-cols-3 sm:grid-cols-3 h-28">
      <div className="flex items-center justify-center font-pixelify text-3xl text-resonPurple"><Link to="/routines">routines</Link></div>
      <Link to="/"><div className="flex items-center justify-center font-micro5 text-9xl text-resonPurple">RESON8</div></Link>
      <div className="flex items-center justify-center font-pixelify text-3xl text-resonPurple"><Link to="/stats">stats</Link></div>
    </header>
  );
};

export default Header;