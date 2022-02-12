//React
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//Pages
import Favorites from "./pages/Favorites";
import Photos from "./pages/Photos";
import Homepage from "./pages/Homepage";
//CSS
import "./App.css";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/photos" element={<Photos />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/" element={<Homepage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
