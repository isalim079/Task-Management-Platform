import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { useLocation } from "react-router-dom";


const PrivateRoute = ({children}) => {

    const {user, loading} = useContext(AuthContext)
    const location = useLocation()

    return (
        <div>
            
        </div>
    );
};

export default PrivateRoute;