import './App.scss';
import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Home from './Pages/Homepage';
import Footer from './components/Footer';
import Resume from './Pages/Resume/resume';
import ChatbotSlot from './components/ChatbotSlot/ChatbotSlot';
import CommandPalette from './components/CommandPalette/CommandPalette';
import Plasma from './components/Plasma/Plasma';

function ScrollToTopOnRoute() {
  const { pathname, state, hash } = useLocation();
  useEffect(() => {
    if (!state?.scrollTo && !hash) window.scrollTo({ top: 0 });
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
}

function App() {
  return (
    <>
      <Plasma />
      <ScrollToTopOnRoute />
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <ChatbotSlot />
      <CommandPalette />
    </>
  );
}

export default App;
