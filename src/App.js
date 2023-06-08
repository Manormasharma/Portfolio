import './App.scss';
import Header from './components/Header';
import Home from './Pages/Homepage';
import Footer from './components/Footer';
import Resume from './Pages/Resume/resume';
import { HashRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Header />
          <div className='main'>
            <Route index element={<Home />} />
            <Route path="resume" element={<Resume />} />
          </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;
