import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client'
import ErrorPage from './routes/Error-page.jsx';
import Home from './routes/Home.jsx';
import Dashboard from './routes/Dashboard.jsx';
import Login from './routes/Login.jsx';
import Register from './routes/Register.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import Learn_More from './routes/Learn_More.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Budget_Edit from './components/Budget_Edit.jsx';

// create routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />
  },
  {
    path: "dashboard",
    element: <Dashboard />
  },
  {
    path: "login",
    element: <Login />
  },
  {
    path: "register",
    element: <Register />
  },
  {
    path: "edit-budget",
    element: <Budget_Edit/>
  },
  {
    path: "learn-more-about-personal-budgeting",
    element: <Learn_More />
  }
]);



function Main() {
  const [isWide, setIsWide] = useState(window.innerWidth > 950);

  useEffect(() => {
    function handleResize() {
      setIsWide(window.innerWidth > 950);
    }
    window.addEventListener('resize', handleResize);
    // Call handler so state gets updated with initial window size 
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <React.StrictMode>
      <Header /> {/* This should always be displayed */}
      {isWide && <Footer />}
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Main />);