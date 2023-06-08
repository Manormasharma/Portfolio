import './App.scss';
import Header from './components/Header';
import Home from './Pages/Homepage/Homepage';
import Footer from './components/Footer';
import Resume from './Pages/Resume/resume';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Project from './Pages/Project';
import SingleProject from './Pages/Project/SingleProject';
import Blog from './Pages/Blog/blog';
import Post from './Pages/Blog/Post';
import Posts from './Pages/Blog/Posts';
import ProjectOutlet from './Pages/Project/Projectoutlet';

function App() {
  return (
    <>
      <Header />
      <div className='main'>
        <BrowserRouter>
          <Routes>
              <Route index element={<Home />} />
              <Route path="resume" element={<Resume />} />
          </Routes>
        </BrowserRouter>
      <Footer />
      </div>
    </>
  );
}

export default App;
