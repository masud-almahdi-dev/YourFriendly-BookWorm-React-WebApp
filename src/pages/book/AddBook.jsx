import axios from "axios";
import { useEffect, useState } from "react";
import useDarkMode from "../../darkmode/darkMode";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import Rating from "react-rating";
import { useAuth } from "../../authentication/Authentication";


const AddBook = () => {
    const { user } = useAuth();
    const [failed, setFailed] = useState(true);
    const [categories, setCategories] = useState([]);
    const [rating, setRating] = useState(2);
    const [image, setImage] = useState(null);
    const { darkmode, setDarkMode } = useDarkMode();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()
    function handleImageChange(event) {
        setImage(event.target.value)
    }
    function handlegoback() {
        history.back();
    }
    
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_SERVER_URI}/categories`).then(data => { setFailed(false); setCategories(data.data); }).catch(() => { setFailed(true); })
        document.title = "Add Book | Friendly BookWorm"
        const imageinput = document.getElementById('image-upload');
        imageinput.addEventListener("change", handleImageChange);
    }, [])
    const handleadd = data => {
        data.rating = rating.toString()
        data.category = categories[parseInt(document.getElementById("currcategory1").value)].title
        axios.post(`${import.meta.env.VITE_SERVER_URI}/add`, data).then(data => {
            if(data.data.acknowledged){

                toast.success(<div className='p-4 py-5'>Book Inserted Successfully<br /> <button onClick={handlegoback} className="px-2 py-1 bg-green-800 text-white rounded-md">Go Back</button></div>, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: "colored",
                })
            }
            
        }).catch((e) => {
            toast.error(<div className='p-4 py-5'>{e.message}</div>, {
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
    const handleRatingChange = (value) => {
        setRating(value);
    };
    return (
        <div className="flex justify-center flex-col items-center text-center">
            <div className="flex w-full pt-8 justify-center items-center">
                <img src="/login.png" className="w-[20vw]" alt="" />
            </div>
            <form onSubmit={handleSubmit(handleadd)} className={`lg:w-[60%] w-full md:px-16 lg:px-10 xl:px-32 ${darkmode ? "text-white" : "text-black"} h-full justify-start p-6 flex flex-col gap-8`}>
                <div className="flex justify-between">
                    {image && <><h1 className="text-4xl pb-6">Add Book</h1>
                        <div className="w-40 aspect-square overflow-hidden rounded-lg flex justify-center items-center">
                            <img src={image} alt="Preview" className="object-cover" />
                        </div></>
                    }
                </div>
                {!image && <h1 className="text-4xl pb-6">Add Book</h1>}
                <div className="flex flex-col"><label className="flex justify-between items-center mb-2"><span>Name:</span>
                    <input type="text" placeholder="Display Name" {...register("name", { required: true })} className={`w-[70%] p-2 rounded-md border text-black border-black/20 hover:border-black/40`} /></label>
                    {errors.name?.type === "required" && <p className=" bg-red-200 text-red-800">Name field is required*</p>}
                </div>
                <div className="flex flex-col"><label className="flex justify-between items-center mb-2"><span>Image Link:</span>
                    <input type="text" id="image-upload" placeholder="Photo URL" {...register("picture", { required: true })} className={`w-[70%] p-2 rounded-md border text-black border-black/20 hover:border-black/40`} /></label>
                    {errors.picture?.type === "required" && <p className=" bg-red-200 text-red-800">Image Link is required*</p>}
                </div>
                {!failed &&
                    <div className="flex flex-col"><label className="flex justify-between items-center mb-2"><span>Category:</span>
                        <select name="category" id="currcategory1" tabIndex={0} className="dropdown-content z-[1] text-black menu p-2 shadow bg-base-100 rounded-md w-[70%]">
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
                    <input type="number" placeholder="Book Count" step="1" pattern="\d+" min="0" defaultValue="0" {...register("quantity", { required: true })} className={`w-[70%] p-2 rounded-md border text-black border-black/20 hover:border-black/40`} onChange={e => { e.target.value = e.target.value.split(".")[0] }} /></label>
                </div>
                <div className="flex flex-col"><label className="flex justify-between items-center mb-2"><span>Rating:</span>
                    <Rating
                        initialRating={rating}
                        onChange={handleRatingChange}
                        emptySymbol={<img src="/star1.png" className="w-16 grayscale brightness-75 opacity-60" />}
                        fullSymbol={<img src="/star1.png" className="w-16 hue-rotate-90" />}
                    />
                </label>
                </div>
                <button className={`p-4 border border-black text-black hover:border-red-500 -my-4 hover:grayscale hover:brightness-75 ${darkmode ? "bg-slate-400" : ""} rounded-lg my-6 hover:invert bg-white transition-all duration-150`}>Add Book</button>
            </form>
            <ToastContainer></ToastContainer>
        </div>
    );
}

export default AddBook;