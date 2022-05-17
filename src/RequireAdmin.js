import { Navigate, useLocation } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from './firebase.init';
import Loading from './Pages/loading'
import useAdmin from './Hooks/useAdmin';
import { signOut } from "firebase/auth";
function RequireAdmin({ children }) {
    const [user, loading, error] = useAuthState(auth);
    let location = useLocation();
    const [admin, adminLoading] = useAdmin(user);
    if (loading || adminLoading) {
        return <Loading></Loading>
    };
    if (!user || !admin) {
        signOut(auth);
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

export default RequireAdmin;