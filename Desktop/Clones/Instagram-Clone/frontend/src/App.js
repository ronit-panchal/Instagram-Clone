import React from 'react';
import Sidebar from './components/sidebar';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
