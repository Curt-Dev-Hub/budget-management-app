import { Navigate } from 'react-router-dom'
import { useLoginStatus } from '../contexts/LoginContext.jsx'
import { Blocks } from 'react-loader-spinner'


const PrivateRoute = ({ component: Component, ...rest }) => {

    const { loginStatus, isLoading, name } = useLoginStatus()

    if(isLoading) return (
      <Blocks
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="blocks-loading"
        wrapperStyle={{margin: "300px auto"}}
        wrapperClass="blocks-wrapper"
        visible={true}
      />
    ); 

    return loginStatus ? (
        <Component name={ name } {...rest} />
    ) : (
      <Navigate to="/login" replace />
    );
}

export default PrivateRoute