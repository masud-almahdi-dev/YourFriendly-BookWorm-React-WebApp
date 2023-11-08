import axios from "axios";
import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import useDarkMode from "../../darkmode/darkMode";
import Rating from "react-rating";
import { useAuth } from "../../authentication/Authentication";

const BorrowedBooks = () => {
    const { user } = useAuth()
    const loaded = useLoaderData()
    const [failed, setFailed] = useState(true);
    const [bookids, setbookids] = useState([]);
    const [books, setbooks] = useState([]);
    const [finalbooks, setFinalBooks] = useState([]);
    const [isfilter, setfilter] = useState(false);
    const { darkmode, setDarkMode } = useDarkMode();
    const navigate = useNavigate()
    useEffect(() => {
        if (user) {
            const data = { user: user.email }
            axios.get(`${import.meta.env.VITE_SERVER_URI}/user`, data).then(data => {
                if (data?.data?._id === loaded) {
                    document.title = "Borrowed Books | Friendly BookWorm"
                    setbookids(data.data?.books);
                } else {
                    const st = { errormessage: "Loading books failed" }
                    navigate("/error", { state: st });
                }
            }).catch((e) => { console.log(e); setFailed(true); })
            axios.get(`${import.meta.env.VITE_SERVER_URI}/books`).then(data => {
                if (data?.data?._id === loaded) {
                    setFailed(false);
                    document.title = "All Books | Friendly BookWorm"
                    setbooks(data.data);
                } else {
                    const st = { errormessage: "Loading books failed" }
                    navigate("/error", { state: st });
                }
            }).catch((e) => { console.log(e); setFailed(true); })
        }
    }, [])
    useEffect(()=>{
        if(books!==null && books!==undefined){
            setFinalBooks(books.filter((item)=>{
                let bole = false;
                for(let i of bookids){
                    if(i== item._id){return true}
                }
            }))
        }
    },[books])
    const handledetails = (id) => {
        navigate(`/book/${id}`);
    }
    const handleupdate = (id) => {
        navigate(`/update/${id}`);
    }
    return (
        <div className="">
            <div className="container mx-auto mt-36 text-white px-6">
                <button onClick={() => { setfilter(!isfilter) }} className="btn btn-warning">Filter by Available</button>
                {!failed && books.filter(item => isfilter ? item.quantity > parseInt(0) : true).length > 0 ?
                    <div className="grid grid-cols-1 lg:grid-cols-2 p-4 gap-4">

                        {finalbooks.filter(item => isfilter ? item.quantity > parseInt(0) : true).map(
                            (item, index) => {
                                return (
                                    <div key={index} className="flex justify-start items-end w-full gap-2">
                                        <img src={item.image ? item.image : "https://i.ibb.co/HXPcQ1d/defaultbook.jpg"} className="h-[40vh] rounded-lg overflow-hidden aspect-[9/12] object-cover contrast-125 saturate-150 brightness-110" alt="" />
                                        <div className="flex flex-col gap-4">
                                            <button className={`bg-blue-700 w-max ml-4 rounded-lg px-4 py-2 hover:brightness-125 transition-all hover:saturate-50`} onClick={() => { handleupdate(item._id) }}>Update</button>
                                            <button className={`bg-blue-500 w-max ml-4 rounded-lg px-4 py-2 hover:brightness-125 transition-all hover:saturate-50`} onClick={() => { handledetails(item._id) }}>Details</button>
                                            <h3 className={`text-xs backdrop-blur-lg px-4 py-2 pb-0 ${darkmode ? "text-white" : "text-black"}`}>Available: {item.quantity}</h3>
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
            </div>
        </div>
    );
}

export default BorrowedBooks;