import React, { useEffect, useState, lazy } from 'react';
import ReactDOM from 'react-dom/client'
import ErrorBoundary from './components/ErrorBoundary.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
// import ErrorPage from './routes/Error-page.jsx';
import Home from './routes/Home.jsx';
// import Dashboard from './routes/Dashboard.jsx';
// import Login from './routes/Login.jsx';
// import Register from './routes/Register.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Learn_More from './routes/Learn_More.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
// import PrivacyPolicy from './routes/PrivacyPolicy.jsx';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
// import Budget_Edit from './components/Budget_Edit.jsx';
import { BudgetsProvider } from './contexts/BudgetsContext.jsx';
import { LoginProvider } from './contexts/LoginContext.jsx';
// import Logout from './routes/Logout.jsx';

const ErrorPage = lazy(() => import('./routes/Error-page.jsx'))
const Dashboard = lazy(() => import('./routes/Dashboard.jsx'))
const Learn_More = lazy(() => import('./routes/Learn_More.jsx'))
const PrivacyPolicy = lazy(() => import('./routes/PrivacyPolicy.jsx'))
const Budget_Edit = lazy(() => import('./components/Budget_Edit.jsx'))
const Logout = lazy(() => import('./routes/Logout.jsx'));
const Login = lazy(() => import('./routes/Login.jsx'));
const Register = lazy(() => import('./routes/Register.jsx'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <ErrorBoundary><Home /></ErrorBoundary>,
    errorElement: <ErrorBoundary><ErrorPage /></ErrorBoundary>
  },
  {
    path: "dashboard",
    element: (<ErrorBoundary><PrivateRoute component={ Dashboard } /></ErrorBoundary>)    
  },
  {
    path: "login",
    element: <ErrorBoundary><Login /></ErrorBoundary>
  },
  {
    path: "privacy-policy",
    element: <ErrorBoundary><PrivacyPolicy/></ErrorBoundary>
  },
  {
    path: "register",
    element: <ErrorBoundary><Register /></ErrorBoundary>
  },
  {
    path: "edit-budget",
    element: (<ErrorBoundary><PrivateRoute component={ Budget_Edit } /></ErrorBoundary>)
  },
  {
    path: "learn-more-about-personal-budgeting",
    element: <ErrorBoundary><Learn_More /></ErrorBoundary>
  },
  {
    path: "logout",
    element: <ErrorBoundary><Logout /></ErrorBoundary>
  }
]);



function Main() {
  const [isWide, setIsWide] = useState(window.innerWidth > 1200)

  useEffect(() => {
    function handleResize() {
      setIsWide(window.innerWidth > 950)
    }
    window.addEventListener('resize', handleResize);
    // Call handler so state gets updated with initial window size 
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='app'>
      <Header />
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