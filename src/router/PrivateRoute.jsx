/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

import loadingAnimation from "../assets/lottieAnimation/loading.json"
import Lottie from "lottie-react";


const PrivateRoute = ({children}) => {

    const {user, loading} = useContext(AuthContext)
    const location = useLocation()

   if (loading) {
    return <div><Lottie animationData={loadingAnimation} loop={true} /></div>
   }
   if(user) {
    return children
   }
   return <Navigate state={location?.pathname} to="/login"></Navigate>
};

export default PrivateRoute;