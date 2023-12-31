import axios from "axios";
import { useEffect, useState } from "react";
import useDarkMode from "../../darkmode/darkMode";
import { useLoaderData, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Rating from "react-rating";
import { useAuth } from "../../authentication/Authentication";
import useAxiosSecure from "../../authentication/useaxiossecure";

const BookDetails = () => {
    const {user} = useAuth()
    const loaded = useLoaderData()
    const [failed, setFailed] = useState(true);
    const [book, setBook] = useState({});
    const axiosSecure = useAxiosSecure()
    const { darkmode, setDarkMode } = useDarkMode();
    const navigate = useNavigate()
    const toastinfo = { position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: false, progress: undefined, theme: "colored" }
    useEffect(() => {
        axiosSecure.get(`/book/${loaded}`).then(data => {
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
    function handleborrow() {
        const data = {} 
        axiosSecure.patch(`/borrow/${book._id}`,data).then(data => {
            if (data.data?.code != undefined && data.data?.code === "50") {
                toast.error(<div className='p-4 py-5'>{data.data?.message}</div>,toastinfo)
            } else if (data.data?.acknowledged != undefined) {
                toast.success(<div className='p-4 py-5'>Book Borrowed Successfully</div>, toastinfo)
            }

        }).catch((e) => { console.log(e) })
    }
    function handlereturn() {
        const data = {} 
        axiosSecure.patch(`/return/${book._id}`,data).then(data => {
            if (data.data?.code != undefined && data.data?.code === "50") {
                toast.error(<div className='p-4 py-5'>{data.data?.message}</div>, toastinfo)
            } else if (data.data?.acknowledged != undefined) {
                toast.success(<div className='p-4 py-5'>Book Returned Successfully</div>, toastinfo)
            }

        }).catch((e) => { console.log(e) })
    }
    const handleread = () => {
        navigate('/content/' + book._id)
    }
    return (
        <div className="">
            <div className="container mx-auto mt-36 text-white px-6">
                {!failed &&
                    <div>
                        <div className="flex justify-center flex-col lg:flex-row gap-4 items-center lg:justify-start lg:items-start w-full rounded-lg overflow-hidden">
                            <img src={book.picture} className="w-full lg:w-1/2 aspect-video object-cover rounded-lg overflow-hidden contrast-125 saturate-150 brightness-110" alt="" />
                            <h1 className="absolute text-2xl lg:text-4xl backdrop-blur-lg lg:mt-4 px-4 py-2 rounded-lg overflow-hidden lg:p-8 ">{book.title}</h1>
                            <div className={`bg-white text-black rounded-lg p-4`}>
                                <h2>{book.name}</h2>
                                <h2>{book.details}</h2>
                                <h2>{book.category}</h2>
                                <h2>Available: {book.quantity}</h2>
                                <Rating initialRating={parseInt(book.Rating)} readonly
                                    emptySymbol={<img src="/star1.png" className="w-10 grayscale opacity-60" />}
                                    fullSymbol={<img src="/star1.png" className="w-10" />}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col lg:flex-row items-center justify-center p-4 gap-4">
                            <button className="bg-yellow-400 px-4 py-2 rounded-md hover:saturate-50 hover:brightness-75 text-black" onClick={handleborrow}>BORROW</button>
                            <button className="bg-green-400 px-4 py-2 rounded-md hover:saturate-50 hover:brightness-75 text-black" onClick={handlereturn}>RETURN</button>
                            <button className="bg-red-400 px-4 py-2 rounded-md hover:saturate-50 hover:brightness-75 text-black" onClick={handleread}>READ</button>
                        </div>
                    </div>
                }
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
}

export default BookDetails;