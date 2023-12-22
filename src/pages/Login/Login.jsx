import Lottie from "lottie-react";
import loginAnimation from "../../assets/lottieAnimation/login.json"
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row w-full justify-around">
                    <div className="">
                       <Lottie className="" animationData={loginAnimation} loop={true}/>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-teal-800 ">
                        <form className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white">Email</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="email"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white">Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="password"
                                    className="input input-bordered"
                                    required
                                />
                                <label className="label">
                                    <p
                                        
                                        className="label-text-alt text-white"
                                    >
                                        New to TASKER? <Link to="/register"><span className="underline text-sm hover:text-white">Register Now</span></Link>
                                    </p>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700">
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;