import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../authentication/useAuth";
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const Login = () => {
    const { user, signIn, googleSignIn } = useAuth();
    const location = useLocation()
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handlelogin = data => {
        signIn(data.email, data.password).then(
            result => {
                navigate(location?.state ? location.state : "/");
            }
        ).catch(error =>
            toast.error(<div className='p-4 py-5'>{error.code==="auth/invalid-login-credentials"? "Email or Password is invalid":error.code}</div>, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
            }))
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
        <div className="container mx-auto flex justify-center text-center">
            <form onSubmit={handleSubmit(handlelogin)} className=" w-96 bg-blue-200">
                <h1 className="text-4xl pb-6">Login</h1>
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
                    <input type="password" {...register("password", { required: true })} className="input input-bordered" />
                    {errors.password?.type === "required" && <p>Password field is required*</p>}
                </div>
                <div className="flex gap-2">
                    <label className="flex gap-2">
                        <span>Dont have an account?</span>
                        <Link to="/signup" state={location?.state ? location.state : "/"} >Sign Up</Link>
                    </label>
                </div>
                <button>Login</button>
                <div>
                    <button onClick={handlegooglelogin}>G</button>
                </div>
            </form>
            <ToastContainer></ToastContainer>
        </div>
    );
}

export default Login;