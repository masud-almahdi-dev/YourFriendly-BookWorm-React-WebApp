import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../authentication/useAuth";
import { ToastContainer, toast } from 'react-toastify';
const SignUp = () => {

    const { user, createUser, googleSignIn } = useAuth();
    const location = useLocation()
    const navigate = useNavigate()

    const handleSignUp = e => {
        e.preventDefault();
        const form = new FormData(e.currentTarget)
        let name = form.get('name')
        let email = form.get('email')
        let pass = form.get('password')
        if (pass.length < 6) {
            seterrors("Password Length must be more than 6 characters.")
        }
        else if (! /[A-Z]/.test(pass)) {
            seterrors("Password must have atleast one upercase character")
        }
        else if (! /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/.test(pass)) {
            seterrors("Password must contain at least one Special Symbol.")
        }
        else {
            createUser(email, pass,).then(res => {
                if (location?.state) {
                    navigate(location.state);
                } else {
                    navigate("/login");
                }
            }
            ).catch(error => console.log(error))
        }
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
    const [errors, seterrors] = useState(null)
    return (

        <div className="container mx-auto flex justify-center text-center">
            <form onSubmit={handleSignUp} className=" w-96 bg-blue-200">
                <h1 className="text-4xl pb-6">SignUp</h1>
                <div className="flex gap-2">
                    <label>
                        <span name='fullname'>Name</span>
                    </label>
                    <input type="name" placeholder="name" name="name" className="input input-bordered" required />
                </div>
                <div className="flex gap-2">
                    <label>
                        <span>Email</span>
                    </label>
                    <input type="email" placeholder="email" name="email" className="input input-bordered" required />
                </div>
                <div className="flex gap-2">
                    <label>
                        <span>Password</span>
                    </label>
                    <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                </div>
                {
                    errors &&
                    <div className="flex gap-2">
                        <label>
                            <span> {errors}</span>
                        </label>
                    </div>
                }
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
        </div>
    );
}

export default SignUp;