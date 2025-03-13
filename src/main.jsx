import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// import { StrictMode, useState, useEffect } from 'react';
// import { createRoot } from 'react-dom/client';
// import './index.css';
// import App from './App.jsx';

// const Root = () => {
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   const toggleDarkMode = () => {
//     setIsDarkMode(!isDarkMode);
//   };

//   useEffect(() => {
//     if (isDarkMode) {
//       document.body.classList.add('darkmood');
//     } else {
//       document.body.classList.remove('darkmood');
//     }
//   }, [isDarkMode]);

//   return (
//     <StrictMode>
//       <App isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
//     </StrictMode>
//   );
// };
// createRoot(document.getElementById('root')).render(<Root />);