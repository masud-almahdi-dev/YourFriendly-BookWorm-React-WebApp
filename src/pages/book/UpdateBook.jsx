import axios from "axios";
import { useEffect, useState } from "react";
import useDarkMode from "../../darkmode/darkMode";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";

const UpdateBook = () => {
    const loaded = useLoaderData()
    const [failed, setFailed] = useState(true);
    const [book, setBook] = useState({});
    const { darkmode, setDarkMode } = useDarkMode();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_SERVER_URI}/book/${loaded}`).then(data => {
            if (data?.data?._id === loaded) {
                setFailed(false);
                document.title = data.data.title + " | Friendly BookWorm"
                setBook(data.data);
            } else {
                const st = { errormessage: "Book id: " + loaded + ", No Such Book" }
                navigate("/error", { state: st });
            }
        }).catch((e) => {
            console.log(e); setFailed(true);
            const st = { errormessage: "Book id: " + loaded + ", loading unsuccessful" }
            navigate("/error", { state: st });
        })
    }, [])
    const handleupdate = data => {
        console.log("hi")
        // signIn(data.email, data.password).then(
        //     result => {
        //         navigate(location?.state ? location.state : "/");
        //     }
        // ).catch(error =>
        //     toast.error(<div className='p-4 py-5'>{error.code === "auth/invalid-login-credentials" ? "Email or Password is invalid" : error.code}</div>, {
        //         position: "bottom-right",
        //         autoClose: 5000,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: false,
        //         progress: undefined,
        //         theme: "colored",
        //     }))
    }
    return ( 
        <div className="flex justify-center flex-col lg:flex-row bg-white lg:bg-yellow-300 lg:h-screen items-center text-center">
            <div className="flex w-full lg:hidden lg:w-1/2 pt-6 lg:pt-0 justify-center items-center">
                <img src="/login.png" className="w-[20vw] lg:w-[40vw]" alt="" />
            </div>
            <form onSubmit={handleSubmit(handleupdate)}  className="w-full lg:w-[45%] md:px-40 lg:px-10 xl:px-32 bg-white h-full justify-center p-6 flex flex-col gap-8">
                <h1 className="text-4xl pb-6">Update Book</h1>
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
                <button className="p-4 border border-black hover:border-red-500 -my-4 hover:grayscale hover:brightness-75 hover:invert bg-white transition-all duration-150">Update</button>
            </form>
            <ToastContainer></ToastContainer>
        </div>
     );
}
 
export default UpdateBook;