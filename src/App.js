import './App.scss';
import Header from './components/Header';
import Home from './Pages/Homepage';
import Footer from './components/Footer';
import Resume from './Pages/Resume/resume';
import ChatbotSlot from './components/ChatbotSlot/ChatbotSlot';
import {
  Route,Routes
} from 'react-router-dom'
function App() {
  return (
    <>
        <Header />
          <div className='main'>
            <Routes>
                <Route path='/' index element={<Home />} />
                <Route path="/resume" element={<Resume />} />
            </Routes>
          </div>
        <Footer />
        <ChatbotSlot />
    </>
  );
}

export default App;
