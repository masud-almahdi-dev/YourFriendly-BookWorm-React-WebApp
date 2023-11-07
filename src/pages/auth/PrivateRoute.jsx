import { Navigate, useLocation } from "react-router-dom";
import {useAuth} from "../../authentication/Authentication";

const PrivateRoute = ({children}) => {
    const {user,loading} = useAuth();
    const location = useLocation()

    if(loading){
        return (
            <h1 className="text-center w-full p-6 mt-4 font-semibold">Loading...</h1>
        )
    }
    if(user){
        return children;
    }

    return <Navigate state={location.pathname} to="/login"></Navigate>;
}
 
export default PrivateRoute;