import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../authentication/useAuth";
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
            
            toast.error(<div className='p-4 py-5'>{error.code==="auth/email-already-in-use"? "E-mail already in use.":error.code}</div>, {
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

        <div className="container mx-auto flex justify-center text-center">
            <form onSubmit={handleSubmit(handleSignUp)} className=" w-96 bg-blue-200">
                <h1 className="text-4xl pb-6">SignUp</h1>
                <div className="flex gap-2">
                    <label>
                        <span name='fullname'>Name</span>
                    </label>
                    <input type="name" {...register("name", { required: true })} className="input input-bordered" />
                    {errors.name?.type === "required" && <p>Name field is required*</p>}
                </div>
                <div className="flex gap-2">
                    <label>
                        <span>Email</span>
                    </label>
                    <input type="email" {...register("email", { required: true })} className="input input-bordered" />
                    {errors.email?.type === "required" && <p>E-mail field is required*</p>}
                </div>
                <div className="flex gap-2">
                    <label>
                        <span>Password</span>
                    </label>
                    <input type="password" {...register("password", { required: true, pattern: /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/ })} className="input input-bordered" />
                    {errors.password?.type === "required" ? <p>Password field is required*</p> :
                        errors.password?.type === "pattern" ? <p>Password must contain at least 6 characters, at least 1 capital letter, and at least 1 special character.</p> : <></>}
                </div>
                <div className="flex gap-2">
                    <label className="flex gap-2">
                        <span>Already Have an account?</span>
                        <Link to="/login" state={location?.state ? location.state : "/"}>Log In</Link>
                    </label>
                </div>
                <button className="mt-2">SignUp</button>
                <div>
                    <button onClick={handlegooglelogin}>G</button>
                </div>
            </form>
            <ToastContainer></ToastContainer>
        </div>
    );
}

export default SignUp;