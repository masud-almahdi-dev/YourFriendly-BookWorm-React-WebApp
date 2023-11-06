import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../authentication/useAuth";
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
    const { signIn, googleSignIn } = useAuth();
    const location = useLocation()
    const navigate = useNavigate()
    const handlelogin = e => {
        e.preventDefault();
        const form = new FormData(e.currentTarget)
        let email = form.get('email')
        let pass = form.get('password')
        signIn(email, pass).then(
            result => {
                navigate(location?.state ? location.state : "/");
            }
        ).catch(error =>
            toast.error(<div className='p-4 py-5'>{error.message}</div>, {
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

    return ( 
        <div className="container mx-auto flex justify-center text-center">
            <form onSubmit={handlelogin} className=" w-96 bg-blue-200">
                <h1 className="text-4xl pb-6">Login</h1>
                <div className="flex gap-2">
                    <label>
                        <span>Email</span>
                    </label>
                    <input type="email" placeholder="email" name="email" required />
                </div>
                <div className="flex gap-2">
                    <label>
                        <span>Password</span>
                    </label>
                    <input type="password" name="password" placeholder="password" required />
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