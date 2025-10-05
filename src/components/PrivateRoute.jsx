// import { Navigate } from 'react-router-dom'
// import { useLoginStatus } from '../contexts/LoginContext.jsx'
// import { Blocks } from 'react-loader-spinner'


// const PrivateRoute = ({ component: Component, ...rest }) => {

//     const { loginStatus, isLoading, name } = useLoginStatus()

//     if(isLoading) return (
//       <Blocks
//         height="80"
//         width="80"
//         color="#4fa94d"
//         ariaLabel="blocks-loading"
//         wrapperStyle={{margin: "300px auto"}}
//         wrapperClass="blocks-wrapper"
//         visible={true}
//       />
//     ); 

//     return loginStatus ? (
//         <Component name={ name } {...rest} />
//     ) : (
//       <Navigate to="/login" replace />
//     );
// }

// export default PrivateRoute

// import { memo, useEffect, useState } from "react";
// import { useLoginStatus } from '../contexts/LoginContext.jsx'
// import { Navigate } from "react-router-dom";

// const PrivateRoute = ({ component: Component, ...rest }) => {
//   const { loginStatus, name } = useLoginStatus();
//   const [loggedIn, setLoggedIn] = useState(false);
//   console.log("PrivateRoute Mounted");

//   useEffect(() => {
//     setLoggedIn(loginStatus);
//   }, [loginStatus]);

//   if(!loginStatus) {
//     console.log("Redirecting to login. loggedIn Status:", loggedIn)
//   }
//   return loggedIn ? ( <Component name={ name } {...rest} /> ) : ( <Navigate to="/login" replace/> );
// };

// export default memo(PrivateRoute);



//-----------------------------------------------

import React, { useMemo } from 'react';
import { useLoginStatus } from '../contexts/LoginContext.jsx'
import { Blocks } from 'react-loader-spinner'

const PrivateRoute = React.memo(({ component: Component, ...rest }) => {
  const { loginStatus, isLoading } = useLoginStatus();

  // Memoize the component to prevent unnecessary re-renders
  const MemoizedComponent = useMemo(() => Component, [Component]);

  if (isLoading) {
    return (
      <Blocks
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="blocks-loading"
        wrapperStyle={{ margin: "300px auto" }}
        wrapperClass="blocks-wrapper"
        visible={true}
      />
    );
  }

  if (!loginStatus) {
    return <Navigate to="/login" replace />;
  }

  return <MemoizedComponent {...rest} />;
});

export default PrivateRoute;