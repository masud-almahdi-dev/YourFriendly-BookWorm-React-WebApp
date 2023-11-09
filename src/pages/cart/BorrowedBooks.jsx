import axios from "axios";
import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import useDarkMode from "../../darkmode/darkMode";
import Rating from "react-rating";
import { useAuth } from "../../authentication/Authentication";
import { ToastContainer, toast } from "react-toastify";
import useAxiosSecure from "../../authentication/useaxiossecure";

const BorrowedBooks = () => {
    const { user } = useAuth()
    const [loaded, setloaded] = useState(false);
    const axiosSecure = useAxiosSecure();
    const [bookids, setbookids] = useState([]);
    const [books, setbooks] = useState([]);
    const [finalbooks, setFinalBooks] = useState([]);
    const [isfilter, setfilter] = useState(false);
    const { darkmode, setDarkMode } = useDarkMode();
    const toastinfo = { position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: false, progress: undefined, theme: "colored" }
    const navigate = useNavigate()
    useEffect(() => {
        const data = { }
        document.title = "Borrowed Books | Friendly BookWorm"
        axiosSecure.get("/user").then(data => {
            if (data?.data?.books) {
                setbookids(data.data?.books);
            } else { navigate("/error", { state: { errormessage: "Loading Borrowed Books failed" } }); }
        }).catch((e) => { console.log(e); setFailed(true); })
        axiosSecure.get("/books").then(data => { setbooks(data.data); }).catch((e) => { console.log(e); navigate("/error", { state: { errormessage: "Loading books failed" } }); })
    }, [axiosSecure])
    useEffect(()=>{
        if(books!==null && books!==undefined){
            setFinalBooks(books.filter((item)=>{ return bookids.includes(item._id) }))
            setloaded(true);
        }
    },[books,bookids])
    const handledetails = (id) => {
        navigate(`/book/${id}`);
    }
    const handleupdate = (id) => {
        navigate(`/update/${id}`);
    }
    function handlereturn(id) {
        const data = {} 
        axiosSecure.patch(`/return/${id}`,data).then(data => {
            if (data.data?.code != undefined && data.data?.code === "50") {
                toast.error(<div className='p-4 py-5'>{data.data?.message}</div>, toastinfo)
            } else if (data.data?.acknowledged != undefined) {
                toast.success(<div className='p-4 py-5'>Book Returned Successfully</div>, toastinfo)
                setbookids(bookids.filter(item => item !== id))
            }
        }).catch((e) => { console.log(e) })
    }
    return (
        <div className="">
            <div className="container mx-auto mt-36 text-white px-6">
                {loaded && finalbooks.length > 0 ?
                    <div className="grid grid-cols-1 lg:grid-cols-2 p-4 gap-4">
                        {finalbooks.map(
                            (item, index) => {
                                return (
                                    <div key={index} className="flex justify-start items-end w-full gap-2" data-aos="fade-right">
                                        <img src={item.image ? item.image : "https://i.ibb.co/HXPcQ1d/defaultbook.jpg"} className="h-[40vh] rounded-lg overflow-hidden aspect-[9/12] object-cover contrast-125 saturate-150 brightness-110" alt="" />
                                        <div className="flex flex-col gap-4">
                                            <button className={`bg-yellow-600 w-max ml-4 rounded-lg px-4 py-2 hover:brightness-125 transition-all hover:saturate-50`} onClick={() => { handlereturn(item._id) }}>RETURN</button>
                                            <button className={`bg-green-600 w-max ml-4 rounded-lg px-4 py-2 hover:brightness-125 transition-all hover:saturate-50`} onClick={() => { handleupdate(item._id) }}>UPDATE</button>
                                            <button className={`bg-blue-600 w-max ml-4 rounded-lg px-4 py-2 hover:brightness-125 transition-all hover:saturate-50`} onClick={() => { handledetails(item._id) }}>DETAILS</button>
                                            <Rating initialRating={parseInt(item.rating)} readonly
                                                emptySymbol={<img src="/star1.png" className="w-10 grayscale brightness-75 opacity-60" />}
                                                fullSymbol={<img src="/star1.png" className="w-10 hue-rotate-90" />}
                                            />
                                            <h3 className={`text-xs backdrop-blur-lg px-4 py-2 pb-0 ${darkmode ? "text-white" : "text-black"}`}>{item.author || "No Author"}</h3>
                                            <h3 className={`text-xs backdrop-blur-lg px-4 py-2 pb-0 ${darkmode ? "text-white" : "text-black"}`}>{item.category}</h3>
                                            <h3 className={`text-lg lg:text-4xl backdrop-blur-lg px-4 py-2 ${darkmode ? "text-white" : "text-[#7B4E4E]"} `}>{item.name}</h3>
                                        </div>
                                    </div>
                                );
                            }
                        )}
                    </div>
                    :
                    <h1 className="bg-slate-700 p-6 mt-6 rounded-lg">Hmm<br />No books here.</h1>
                }
                <ToastContainer></ToastContainer>
            </div>
        </div>
    );
}

export default BorrowedBooks;