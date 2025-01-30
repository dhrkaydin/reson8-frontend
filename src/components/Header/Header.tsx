import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <header className="bg-resonBlue grid grid-cols-2 sm:grid-cols-3">
      <div className="hidden sm:flex items-center justify-center font-pixelify text-3xl text-resonPurple">
        <Link to="/routines">
          routines
        </Link>
      </div>

      <Link to="/">
        <div className="flex items-center justify-center font-micro5 text-9xl text-resonPurple">
          <span className="hidden sm:flex">RESON8</span>
          <span className="sm:hidden">R8</span>
        </div>
      </Link>

      <div className="flex items-center justify-center font-pixelify text-3xl text-resonPurple">
        <Link to="/stats">
          stats
        </Link>
      </div>
    </header>
  );
};

export default Header;