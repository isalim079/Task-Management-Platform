/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

import loadingAnimation from "../assets/lottieAnimation/loading.json";
import Lottie from "lottie-react";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    console.log(loading, "private route");

    if (loading) {
        return (
            <div className="h-screen flex justify-center items-center">
                <Lottie
                    className="w-60"
                    animationData={loadingAnimation}
                    loop={true}
                />
                
            </div>
        );
    }
    if (user) {
        return children;
    }
    return <Navigate state={location?.pathname} to="/login"></Navigate>;
};

export default PrivateRoute;
