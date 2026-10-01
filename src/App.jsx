import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Merch from './pages/Merch';
import About from './pages/About';
import ClassMT from './pages/projects/ClassMT';
import ParkandBarn from './pages/projects/ParkandBarn';
import FrameDeer from './pages/projects/FrameDeer';
import PenultimateHub from './pages/projects/PenultimateHub';
import ThankYou from './pages/ThankYou';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/classmt" element={<ClassMT />} />
            <Route path="/projects/parkandbarn" element={<ParkandBarn />} />
            <Route path="/projects/framedeer" element={<FrameDeer />} />
            <Route path="/projects/penultimatehub" element={<PenultimateHub />} />
            <Route path="/merch" element={<Merch />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App
