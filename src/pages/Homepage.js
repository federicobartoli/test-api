//React
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div>
      <Link to="/photos">Go to Photos</Link>
      <Link to="/favorites">Go to Favorites</Link>
    </div>
  );
};

export default Homepage;
