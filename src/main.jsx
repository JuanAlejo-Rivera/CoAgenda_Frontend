// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './styles.css'
// import { CalendarApp } from './CalendarApp.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <CalendarApp />
//   </StrictMode>
// )


import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import { CalendarApp } from './CalendarApp.jsx';

const root = createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>
    <CalendarApp />
  // </React.StrictMode>
);
