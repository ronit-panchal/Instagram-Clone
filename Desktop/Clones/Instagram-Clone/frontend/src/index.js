import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Explore from './pages/Compass';
import Reels from './pages/Film';
import Messages from './pages/MessageCircle';
import Notifications from './pages/Heart';
import Create from './pages/PlusSquare';
import Dashboard from './pages/BarChart2';
import Login from './pages/User';

const sider = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/home",
        element: <Home/>,
      },
      {
        path: "/search",
        element: <Search/>,
      },
      {
        path: "/explore",
        element: <Explore/>,
      },
      {
        path: "/reels",
        element: <Reels/>,
      },
      {
        path: "/message",
        element: <Messages/>,
      },
      {
        path: "/notifications",
        element: <Notifications/>,
      },
      {
        path: "/create",
        element: <Create/>,
      },
      {
        path: "/dashboard",
        element: <Dashboard/>,
      },
      {
        path: "/login",
        element: <Login/>,
      },
      {
        path: "*",
        element: <p>Page not found</p>,
      },
    ]
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={sider}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
