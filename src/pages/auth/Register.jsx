import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {useAuth} from "../../authentication/Authentication";
import { useForm } from "react-hook-form"
import { ToastContainer, toast } from 'react-toastify';
const SignUp = () => {

    const { user, createUser, googleSignIn } = useAuth();
    const location = useLocation()
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleSignUp = data => {
        console.log(data)
        createUser(data.email, data.password).then(res => {
            console.log(res)
            console.log(res.code)
            // UPDATE DATABASE
            // if (location?.state) {
            //     navigate(location.state);
            // } else {
            //     navigate("/login");
            // }
        }
        ).catch(error => {

            toast.error(<div className='p-4 py-5'>{error.code === "auth/email-already-in-use" ? "E-mail already in use." : error.code}</div>, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
            })
        })
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
            document.title = "Sign Up | Friendly BookWorm"
        }
    }, [])
    return (

        <div className="flex justify-between flex-col lg:flex-row bg-white lg:bg-yellow-300 lg:h-screen items-center text-center">
            <div className="flex w-full lg:w-1/2 justify-center items-center">
                <img src="/login.png" className="w-[20vw] lg:w-[40vw]" alt="" />
            </div>
            <form onSubmit={handleSubmit(handleSignUp)} className="w-full lg:w-[45%] md:px-40 lg:px-10 xl:px-32 bg-white h-full justify-center p-6 flex flex-col gap-8">
                <h1 className="text-4xl pb-6">SignUp</h1>
                <div className="flex flex-col">
                    <label className="flex justify-between items-center mb-2">
                        <span name='fullname'>Name:</span>
                        <input type="name" {...register("name", { required: true })} className="w-[70%] p-2 rounded-md border border-black/20 hover:border-black/40" />
                    </label>
                    {errors.name?.type === "required" && <p className=" bg-red-200 text-red-800">Name field is required*</p>}
                </div>
                <div className="flex flex-col">
                    <label className="flex justify-between items-center mb-2">
                        <span>Email:</span>
                        <input type="email" {...register("email", { required: true })} className="w-[70%] p-2 rounded-md border border-black/20 hover:border-black/40" />
                    </label>
                    {errors.email?.type === "required" && <p className=" bg-red-200 text-red-800">E-mail field is required*</p>}
                </div>
                <div className="flex flex-col">
                    <label className="flex justify-between items-center mb-2">
                        <span>Password:</span>
                        <input type="password" {...register("password", { required: true, pattern: /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/ })} className="w-[70%] p-2 rounded-md border border-black/20 hover:border-black/40" />
                    </label>
                    {errors.password?.type === "required" ? <p className=" bg-red-200 text-red-800">Password field is required*</p> :
                        errors.password?.type === "pattern" ? <p className=" bg-red-200 text-red-800">Password must contain at least 6 characters, at least 1 capital letter, and at least 1 special character.</p> : <></>}
                </div>
                <button className="p-4 border border-black hover:border-red-500 -my-4 hover:grayscale hover:brightness-75 hover:invert bg-white transition-all duration-150">SignUp</button>
                <button onClick={handlegooglelogin} className="flex items-center w-full p-4 border hover:border-red-500 hover:grayscale hover:brightness-75 hover:invert bg-white transition-all duration-150 border-black rounded-md"><img src="/google.png" alt="google" className="w-20" /><span className="w-full text-center">Log In With Google</span>
                </button>
                <div className="flex">
                    <label className="flex gap-2 items-center">
                        <span>Already Have an account?</span>
                        <Link to="/login" className=" hover:bg-blue-500 hover:text-white p-2 rounded-md transition-colors duration-150 text-blue-500" state={location?.state ? location.state : "/"}>Log In</Link>
                    </label>
                </div>
            </form>
            <ToastContainer></ToastContainer>
        </div>
    );
}

export default SignUp;