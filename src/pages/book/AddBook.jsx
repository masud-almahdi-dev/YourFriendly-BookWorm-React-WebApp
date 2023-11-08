import axios from "axios";
import { useEffect, useState } from "react";
import useDarkMode from "../../darkmode/darkMode";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";


const AddBook = () => {
    const [failed, setFailed] = useState(true);
    const [categories, setCategories] = useState([]);
    const { darkmode, setDarkMode } = useDarkMode();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()
    useEffect(() => {
        document.title = "Add Book | Friendly BookWorm"
        axios.get(`${import.meta.env.VITE_SERVER_URI}/categories`).then(data => { setFailed(false); setCategories(data.data); }).catch(() => { setFailed(true); })
    }, [])
    const handleadd = data => {
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
        <div className="flex justify-center flex-col items-center text-center">
            <div className="flex w-full pt-6 justify-center items-center">
                <img src="/login.png" className="w-[20vw]" alt="" />
            </div>
            <form onSubmit={handleSubmit(handleadd)} className={`lg:w-[60%] w-full md:px-16 lg:px-10 xl:px-32 ${darkmode ? "text-white" : "text-black"} h-full justify-start p-6 flex flex-col gap-8`}>
                <h1 className="text-4xl pb-6">Add Book</h1>
                <div className="flex flex-col"><label className="flex justify-between items-center mb-2"><span>Name:</span>
                    <input type="text" placeholder="Display Name" {...register("name", { required: true })} className={`w-[70%] p-2 rounded-md border text-black border-black/20 hover:border-black/40`} /></label>
                    {errors.name?.type === "required" && <p className=" bg-red-200 text-red-800">Name field is required*</p>}
                </div>
                <div className="flex flex-col"><label className="flex justify-between items-center mb-2"><span>Image Link:</span>
                    <input type="text" placeholder="Photo URL" {...register("picture", { required: true })} className={`w-[70%] p-2 rounded-md border text-black border-black/20 hover:border-black/40`} /></label>
                    {errors.picture?.type === "required" && <p className=" bg-red-200 text-red-800">Image Link is required*</p>}
                </div>
                {!failed &&
                    <div className="flex flex-col"><label className="flex justify-between items-center mb-2"><span>Category:</span>
                        <select name="category" tabIndex={0} className="dropdown-content z-[1] text-black menu p-2 shadow bg-base-100 rounded-md w-[70%]">
                            {categories.map((i, index) => {
                                return <option value={index} key={index}>{i.title}</option>
                            })}
                        </select>
                    </label>
                    </div>

                }
                <div className="flex flex-col"><label className="flex justify-between items-center mb-2"><span>Author Name:</span>
                    <input type="text" placeholder="Author Title" {...register("author", { required: true })} className={`w-[70%] p-2 rounded-md border text-black border-black/20 hover:border-black/40`} /></label>
                    {errors.author?.type === "required" && <p className=" bg-red-200 text-red-800">Author Name field is required*</p>}
                </div>
                <div className="flex flex-col"><label className="flex justify-between items-center mb-2"><span>Description:</span>
                    <input type="text" placeholder="Descriptions" {...register("details")} className={`w-[70%] p-2 rounded-md border text-black border-black/20 hover:border-black/40`} /></label>
                </div>
                <div className="flex flex-col"><label className="flex justify-between items-center mb-2"><span>Quantity:</span>
                    <input type="number" placeholder="Book Count" step="1" pattern="\d+" min="0" {...register("quantity", { required: true })} className={`w-[70%] p-2 rounded-md border text-black border-black/20 hover:border-black/40`} onChange={e => { e.target.value = e.target.value.split(".")[0] }} /></label>
                    {errors.quantity?.type === "required" && <p className=" bg-red-200 text-red-800">Quantity field is required*</p>}
                </div>
                <div className="flex flex-col"><label className="flex justify-between items-center mb-2"><span>Rating:</span>
                    <input type="text" {...register("rating", { required: true })} className={`w-[70%] p-2 rounded-md border text-black border-black/20 hover:border-black/40`} /></label>
                    {errors.rating?.type === "required" && <p className=" bg-red-200 text-red-800">Rating field is required*</p>}
                </div>
                <button className={`p-4 border border-black text-black hover:border-red-500 -my-4 hover:grayscale hover:brightness-75 ${darkmode ? "bg-slate-400" : ""} rounded-lg my-6 hover:invert bg-white transition-all duration-150`}>Add Book</button>
            </form>
            <ToastContainer></ToastContainer>
        </div>
    );
}

export default AddBook;