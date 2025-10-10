import { Navigate } from 'react-router-dom';
import React, { useMemo } from 'react';
import { useLoginStatus } from '../contexts/LoginContext.jsx';
import { Blocks } from 'react-loader-spinner';

// eslint-disable-next-line react/prop-types
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

PrivateRoute.displayName = 'PrivateRoute';

export default PrivateRoute;