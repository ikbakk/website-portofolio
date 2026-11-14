import { useEffect, useState } from 'react';

export default function WorldControls() {
  const [theme, setTheme] = useState('night');

  useEffect(() => {
    let saved = null;
    try { saved = localStorage.getItem('portfolio-theme'); } catch {}
    const next = saved === 'day' ? 'day' : 'night';
    setTheme(next);
    document.documentElement.dataset.theme = next;
  }, []);

  function commitTheme(next) {
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('portfolio-theme', next); } catch {}
    setTheme(next);
  }

  function changeTheme() {
    const next = theme === 'night' ? 'day' : 'night';
    commitTheme(next);
  }

  return <div className="world-controls" data-od-id="world-controls">
    <button className="theme-control pixel-button" type="button" onClick={changeTheme} aria-label={`Switch to ${theme === 'night' ? 'day' : 'night'} theme`} data-od-id="theme-toggle">
      <span className="theme-symbol" aria-hidden="true">{theme === 'night' ? '☾' : '☼'}</span>
      <span>{theme === 'night' ? 'Night' : 'Day'}</span>
      <span className="switch-track" aria-hidden="true"><span /></span>
    </button>
  </div>;
}
