import {Navigate, useLocation} from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { useAppSelector } from "../../app/hooks";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const location = useLocation();
    const isAuthenticated =  useAppSelector(state => state.auth.isAuthenticated);



    // if(isLoading){
    //     return <Spinner animation="border" variant="primary" />;
    // }
   

    if (isAuthenticated === false) {
        // Redirect to login page and preserve the attempted URL
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;