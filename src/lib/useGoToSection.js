import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { scrollToSection } from './site';

// Scrolls to a homepage section, navigating home first when on another route.
// Homepage picks up `state.scrollTo` after mount.
export default function useGoToSection() {
  const location = useLocation();
  const navigate = useNavigate();

  return useCallback(
    (id) => {
      if (location.pathname === '/') {
        if (id === 'top') window.scrollTo({ top: 0, behavior: 'smooth' });
        else scrollToSection(id);
        return;
      }
      navigate('/', { state: { scrollTo: id } });
    },
    [location.pathname, navigate]
  );
}
