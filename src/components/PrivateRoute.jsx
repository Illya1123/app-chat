import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const user = localStorage.getItem('email');

    return user ? children : <Navigate to="/signin" replace />;
};

export default PrivateRoute;
