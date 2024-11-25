import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client'
import ErrorBoundary from './components/ErrorBoundary.jsx';
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
import { BudgetsProvider } from './contexts/BudgetsContext.jsx';
import { LoginProvider } from './contexts/LoginContext.jsx';

// create routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <ErrorBoundary><Home /></ErrorBoundary>,
    errorElement: <ErrorBoundary><ErrorPage /></ErrorBoundary>
  },
  {
    path: "dashboard",
    element: <ErrorBoundary><Dashboard /></ErrorBoundary>
  },
  {
    path: "login",
    element: <ErrorBoundary><Login /></ErrorBoundary>
  },
  {
    path: "register",
    element: <ErrorBoundary><Register /></ErrorBoundary>
  },
  {
    path: "edit-budget",
    element: <ErrorBoundary><Budget_Edit/></ErrorBoundary>
  },
  {
    path: "learn-more-about-personal-budgeting",
    element: <ErrorBoundary><Learn_More /></ErrorBoundary>
  }
]);



function Main() {
  const [isWide, setIsWide] = useState(window.innerWidth > 1200);

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
    <div className='app'>
      <Header /> {/* This should always be displayed */}
      {isWide && <Footer />}
      <RouterProvider router={router} />
    </div>  
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<React.StrictMode>
  <ErrorBoundary>
    <LoginProvider>
      <BudgetsProvider>
        <Main />
      </BudgetsProvider>
    </LoginProvider>
  </ErrorBoundary>
</React.StrictMode>
);