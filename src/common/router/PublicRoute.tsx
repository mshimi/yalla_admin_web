// src/routes/PublicRoute.tsx
import {Navigate} from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';




interface PublicRouteProps {
    children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const isAuthenticated =  useAppSelector(state => state.auth.isAuthenticated);
   


  

    if (isAuthenticated) {
        // User is authenticated, redirect to home page
        return <Navigate to="/" replace />;
    }

    return children;
};

export default PublicRoute;