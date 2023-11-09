import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../authentication/Authentication";
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../authentication/useaxiossecure";

const Login = () => {
    const { user, signIn, googleSignIn } = useAuth();
    const location = useLocation()
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const toastinfo = { position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: false, progress: undefined, theme: "colored" }

    const handlelogin = data => {
        const email = data.email
        signIn(data.email, data.password).then(
            result => {
                //const loggedinuser = result.user
                const udata = { email }
                axiosSecure.post(`/jwt`, udata).then(res => {
                    if (res.data.success) {
                        navigate(location?.state ? location.state : "/");
                    }
                }).catch(e => console.log(e))
            }
        ).catch(error =>
            toast.error(<div className='p-4 py-5'>{error.code === "auth/invalid-login-credentials" ? "Email or Password is invalid" : error.code}</div>, toastinfo))
    }
    const handlegooglelogin = e => {
        e.preventDefault();
        googleSignIn().then(
            result => {
                navigate(location?.state ? location.state : "/");
            }
        ).catch(error => console.log(error))
    }
    useEffect(() => {
        if (user) {
            navigate(location?.state ? location.state : "/");
        } else {
            document.title = "Login | Friendly BookWorm"
        }
    }, [])
    return (

        <div className="flex justify-between flex-col lg:flex-row bg-white lg:bg-yellow-300 lg:h-screen items-center text-center">
            <div className="flex w-full lg:w-1/2 pt-6 lg:pt-0 justify-center items-center">
                <img src="/login.png" className="w-[20vw] lg:w-[40vw]" alt="" />
            </div>
            <form onSubmit={handleSubmit(handlelogin)} className="w-full lg:w-[45%] md:px-40 lg:px-10 xl:px-32 bg-white h-full justify-center p-6 flex flex-col gap-8">
                <h1 className="text-4xl pb-6">Login</h1>
                <div className="flex flex-col">
                    <label className="flex justify-between items-center mb-2">
                        <span>Email</span>
                        <input type="email" {...register("email", { required: true })} className="w-[70%] p-2 rounded-md border border-black/20 hover:border-black/40" />
                    </label>
                    {errors.email?.type === "required" && <p className=" bg-red-200 text-red-800">E-mail field is required*</p>}
                </div>
                <div className="flex flex-col">
                    <label className="flex justify-between items-center mb-2">
                        <span>Password</span>
                        <input type="password" {...register("password", { required: true })} className="w-[70%] p-2 rounded-md border border-black/20 hover:border-black/40" />
                    </label>
                    {errors.password?.type === "required" && <p className=" bg-red-200 text-red-800">Password field is required*</p>}
                </div>
                <button className="p-4 border border-black hover:border-red-500 -my-4 hover:grayscale hover:brightness-75 hover:invert bg-white transition-all duration-150">Sign In</button>
                <button onClick={handlegooglelogin} className="flex items-center w-full p-4 border hover:border-red-500 hover:grayscale hover:brightness-75 hover:invert bg-white transition-all duration-150 border-black rounded-md"><img src="/google.png" alt="google" className="w-20" /><span className="w-full text-center">Log In With Google</span>
                </button>
                <div className="flex flex-col">
                    <label className="flex gap-2 items-center justify-between md:justify-normal">
                        <span>Dont have an account?</span>
                        <Link to="/signup" className=" hover:bg-blue-500 md:bg-white bg-blue-200 hover:text-white p-2 rounded-md transition-colors duration-150 text-blue-500" state={location?.state ? location.state : "/"} >Sign Up</Link>
                    </label>
                </div>
            </form>
            <ToastContainer></ToastContainer>
        </div>
    );
}

export default Login;