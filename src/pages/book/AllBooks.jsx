import axios from "axios";
import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import useDarkMode from "../../darkmode/darkMode";
import Rating from "react-rating";
import useAxiosSecure from "../../authentication/useaxiossecure";
import { Allbookitem } from "./bookfunctions";
import { ToastContainer } from "react-toastify";

const AllBooks = () => {
    const loaded = useLoaderData()
    const [failed, setFailed] = useState(true);
    const axiosSecure = useAxiosSecure()
    const [books, setbooks] = useState([]);
    const [isfilter, setfilter] = useState(false);
    const navigate = useNavigate()
    const handledetails = (id) => { navigate(`/book/${id}`); }
    const handleupdate = (id) => { navigate(`/update/${id}`); }
    useEffect(() => {
        axiosSecure.get(`/books`).then(data => {
            if (data?.data?._id === loaded) {
                setFailed(false);
                document.title = "All Books | Friendly BookWorm"
                setbooks(data.data);
            } else {
                const st = { errormessage: "Loading books failed" }
                navigate("/error", { state: st });
            }
        }).catch((e) => { console.log(e); setFailed(true); })
    }, [])
    return (
        <div className="">
            <div className="container mx-auto mt-36 text-white px-6">
                <button onClick={()=>{setfilter(!isfilter)}} className="btn btn-warning">Filter by Available</button>
                {!failed && books.filter(item=>isfilter? item.quantity>parseInt(0):true).length > 0 ?
                    <div className="grid grid-cols-1 lg:grid-cols-2 p-4 gap-4">
                        
                        <Allbookitem arr={books.filter(item=>isfilter? item.quantity>parseInt(0):true)} />
                    </div>
                    :
                    <h1 className="bg-slate-700 p-6 mt-6 rounded-lg">Hmm<br />No books here.</h1>
                }
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
}
 
export default AllBooks;