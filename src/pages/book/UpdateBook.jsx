import axios from "axios";
import { useEffect, useState } from "react";
import useDarkMode from "../../darkmode/darkMode";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import Rating from "react-rating";
import useAxiosSecure from "../../authentication/useaxiossecure";
const UpdateBook = () => {
    const [failed, setFailed] = useState({categories:true,book:true});
    const [categories, setCategories] = useState([]);
    const [rating, setRating] = useState(2);
    const loaded = useLoaderData();
    const [book, setBook] = useState({});
    const axiosSecure = useAxiosSecure()
    const [image, setImage] = useState(null);
    const { darkmode, setDarkMode } = useDarkMode();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()
    const toastinfo = { position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: false, progress: undefined, theme: "colored" }
    function handleImageChange(event) {
        setImage(event.target.value)
    }
    const handleDelete = async (e) => {
        e.preventDefault();
        axiosSecure.delete(`/delete/${book._id}`).then(res => {
            history.back()
        }).catch((e) => {
            console.log(e); //setFailed(true);
            const st = { errormessage: "Book id: " + loaded + ", deleting unsuccessful" }
            navigate("/error", { state: st });
        })
    }
    useEffect(() => {
        axiosSecure.get(`/book/${loaded}`).then(data => {
            if (data?.data?._id === loaded) {
                let f = failed;f.book = false;
                setFailed(f);
                let i_name =  document.querySelector("#updateform #name")
                let i_image =  document.querySelector("#updateform #image-upload")
                let i_currcategory2 =  document.querySelector("#updateform #currcategory2")
                let i_author =  document.querySelector("#updateform #author")
                let i_details =  document.querySelector("#updateform #details")
                let i_quantity =  document.querySelector("#updateform #quantity")
                i_name.value =  data.data?.name
                i_image.value =  data.data?.picture
                for(let i=0; i<categories.length;i++){
                    if(categories[i].title=== data.data?.category )
                    {i_currcategory2.value = i }
                }
                i_author.value =  data.data?.author
                i_details.value =  data.data?.details
                i_quantity.value =  data.data?.quantity
                errors.name = {}
                setRating(parseInt(data.data?.rating))
                setImage(data.data?.picture)
                setBook(data.data);
            } else {
                const st = { errormessage: "Book id: " + loaded + ", No Such Book" }
                navigate("/error", { state: st });
            }
        }).catch((e) => {
            console.log(e); //setFailed(true);
            const st = { errormessage: "Book id: " + loaded + ", loading unsuccessful" }
            navigate("/error", { state: st });
        })

        axiosSecure.get(`/categories`).then(data => { let f = failed;f.categories = false; setFailed(f); setCategories(data.data); }).catch(() => { setFailed(true); })
        document.title = "Update Book | Friendly BookWorm"
        const imageinput = document.getElementById('image-upload');
        imageinput.addEventListener("change", handleImageChange);
    }, [])
    function handlegoback() {
        history.back();
    }
    const handleupdate = data => {
        data.name =  document.querySelector("#updateform #name").value
        data.picture =  document.querySelector("#updateform #image-upload").value
        data.author =  document.querySelector("#updateform #author").value
        data.details =  document.querySelector("#updateform #details").value
        data.quantity =  document.querySelector("#updateform #quantity").value
        data.rating = rating.toString()
        data.category = categories[parseInt(document.getElementById("currcategory2").value)].title
        axiosSecure.patch(`/update/${book._id}`, data).then(data => {
            if(data.data.acknowledged){

                toast.success(<div className='p-4 py-5'>Book Updated Successfully<br /> <button onClick={handlegoback} className="px-2 py-1 bg-green-800 text-white rounded-md">Go Back</button></div>,toastinfo)
            }
            
        }).catch((e) => {
            toast.error(<div className='p-4 py-5'>{e.message}</div>,toastinfo)
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
            <form onSubmit={handleSubmit(handleupdate)} id="updateform" className={`lg:w-[60%] w-full md:px-16 lg:px-10 xl:px-32 ${darkmode ? "text-white" : "text-black"} h-full justify-start p-6 flex flex-col gap-8`}>
                <div className="flex justify-between">
                    {image && <><h1 className="text-4xl pb-6">Update Book</h1>
                        <div className="w-40 aspect-square overflow-hidden rounded-lg flex justify-center items-center">
                            <img src={image} alt="Preview" className="object-cover" />
                        </div></>
                    }
                </div>
                {!image && <h1 className="text-4xl pb-6">Update Book</h1>}
                <div className="flex flex-col"><label className="flex justify-between items-center mb-2"><span>Name:</span>
                    <input type="text" placeholder="Display Name" id="name" {...register("name")} className={`w-[70%] p-2 rounded-md border text-black border-black/20 hover:border-black/40`} /></label>
                </div>
                <div className="flex flex-col"><label className="flex justify-between items-center mb-2"><span>Image Link:</span>
                    <input type="text" id="image-upload" placeholder="Photo URL" {...register("picture")} className={`w-[70%] p-2 rounded-md border text-black border-black/20 hover:border-black/40`} /></label>
                </div>
                {!failed.categories &&
                    <div className="flex flex-col"><label className="flex justify-between items-center mb-2"><span>Category:</span>
                        <select name="category" id="currcategory2" tabIndex={0} className="dropdown-content z-[1] text-black menu p-2 shadow bg-base-100 rounded-md w-[70%]">
                            {categories.map((i, index) => {
                                return <option value={index} key={index}>{i.title}</option>
                            })}
                        </select>
                    </label>
                    </div>

                }
                <div className="flex flex-col"><label className="flex justify-between items-center mb-2"><span>Author Name:</span>
                    <input type="text" placeholder="Author Title" id="author" {...register("author")} className={`w-[70%] p-2 rounded-md border text-black border-black/20 hover:border-black/40`} /></label>
                </div>
                <div className="flex flex-col"><label className="flex justify-between items-center mb-2"><span>Description:</span>
                    <input type="text" placeholder="Descriptions" id="details" {...register("details")} className={`w-[70%] p-2 rounded-md border text-black border-black/20 hover:border-black/40`} /></label>
                </div>
                <div className="flex flex-col"><label className="flex justify-between items-center mb-2"><span>Quantity:</span>
                    <input type="number" placeholder="Book Count" id="quantity" step="1" pattern="\d+" min="0" defaultValue="0" {...register("quantity")} className={`w-[70%] p-2 rounded-md border text-black border-black/20 hover:border-black/40`} onChange={e => { e.target.value = e.target.value.split(".")[0] }} /></label>
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
                <button className={`p-4 border border-black text-black hover:border-red-500 -my-4 hover:grayscale hover:brightness-75 ${darkmode ? "bg-slate-400" : ""} rounded-lg my-6 hover:invert bg-white transition-all duration-150`}>Update Book</button>
                <button className={`p-4 border border-black text-black hover:border-red-500 -my-4 hover:grayscale hover:brightness-75 ${darkmode ? "bg-slate-400" : ""} rounded-lg  hover:invert bg-red-200 transition-all duration-150`} onClick={(e) => {e.preventDefault(); document.getElementById('deleteconfirm').showModal()}}>Delete Book</button>
            </form>
            <dialog id="deleteconfirm" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box text-black">
                    <h3 className="font-bold text-lg">Delete</h3>
                    <p className="py-4">Are you sure you want to delete {book.title}</p>
                    <form method="dialog" className="w-full flex justify-between">
                        <button className="btn btn-error hover:brightness-75 text-white" onClick={handleDelete}>Delete</button>
                        <button method="dialog" className="btn hover:brightness-90">Close</button>
                    </form>
                </div>
            </dialog>
            <ToastContainer></ToastContainer>
        </div>
    );
}
 
export default UpdateBook;