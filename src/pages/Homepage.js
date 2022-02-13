//React
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div>
      <Link to="/photos">
        <span className="material-icons-outlined">photo_library</span>
      </Link>
      <Link to="/favorites">
        <span className="material-icons-outlined">star</span>
      </Link>
    </div>
  );
};

export default Homepage;
