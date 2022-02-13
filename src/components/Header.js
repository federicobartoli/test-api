//React
import { Link } from 'react-router-dom';
import { Logo } from '../assets/svg/Svg';
//Css
import '../assets/css/Header.css';

const Header = () => {
  return (
    <header>
      <div className="header-container" data-testid="header">
        <Link to="/">
          <Logo />
        </Link>
        <input id="menu-toggle" type="checkbox" />
        <label className="header-menu" htmlFor="menu-toggle">
          <div className="header-button"></div>
        </label>
        <nav>
          <Link to="/photos">Photos</Link>
          <Link to="/favorites">Favorites</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
