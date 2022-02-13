//React
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//Components
import Layout from './components/Layout';
//Pages
import Favorites from './pages/Favorites';
import Photos from './pages/Photos';
import Homepage from './pages/Homepage';

function App() {
  return (
    <div className="app">
      <Router>
        <Layout>
          <Routes>
            <Route path="/photos" element={<Photos />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/" element={<Homepage />} />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
