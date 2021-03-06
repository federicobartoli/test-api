//React
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//Components
import Layout from './components/Layout';
//Pages
import Photos from './pages/Photos';
import Homepage from './pages/Homepage';

function App() {
  // The favorites route is just the photo component with favorites=true that works as a filter.
  return (
    <div className="app">
      <Router>
        <Layout>
          <Routes>
            <Route path="/photos" element={<Photos />} />
            <Route path="/favorites" element={<Photos favorites={true} />} />
            <Route path="/" element={<Homepage />} />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
