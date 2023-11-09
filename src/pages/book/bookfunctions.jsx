import Rating from "react-rating";
import useDarkMode from "../../darkmode/darkMode";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../authentication/Authentication";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../authentication/useaxiossecure";
import { toast } from "react-toastify";

const Allbookitem = ({ arr }) => {
    const { darkmode } = useDarkMode();
    const navigate = useNavigate()
    const [userrole, setuserrole] = useState("")
    const axiosSecure = useAxiosSecure()
    const toastinfo = { position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: false, progress: undefined, theme: "colored" }
    const { user } = useAuth()
    const handledetails = (id) => {
        navigate(`/book/${id}`);
    }
    const handleupdate = (id) => {
            navigate(`/update/${id}`);
    }

    return (<>
        {
        arr.map((item, index) => {
            return <div key={index} className={`flex justify-start items-end w-full gap-2 overflow-hidden text-white ${darkmode? "bg-white/10":"bg-slate-100"} rounded-lg`}>
                <img src={item.image ? item.image : "https://i.ibb.co/HXPcQ1d/defaultbook.jpg"} className="h-[40vh] rounded-lg overflow-hidden aspect-[9/12] object-cover contrast-125 saturate-150 brightness-110" alt="" />
                <div className="flex flex-col gap-4 w-1/2">
                    <div className="flex">
                    <button className={` ${userrole == "librarian" ? "bg-green-600" : "bg-slate-600"} w-max ml-4 rounded-lg px-4 py-2 hover:brightness-125 transition-all hover:saturate-50`} onClick={() => { handleupdate(item._id) }}>Update</button>
                    <button className={`bg-blue-600 w-max ml-4 rounded-lg px-4 py-2 hover:brightness-125 transition-all hover:saturate-50`} onClick={() => { handledetails(item._id) }}>Details</button>
                    </div>
                    <h3 className={`text-xs backdrop-blur-lg px-4 py-2 pb-0 ${darkmode ? "text-white" : "text-black"}`}>Available: {item.quantity}</h3>
                    <Rating initialRating={parseInt(item.rating)} readonly
                        emptySymbol={<img src="/star1.png" className="w-10 grayscale brightness-75 opacity-60" />}
                        fullSymbol={<img src="/star1.png" className="w-10 hue-rotate-90" />}
                    />
                    <h3 className={`text-xs backdrop-blur-lg px-4 py-2 pb-0 ${darkmode ? "text-white" : "text-black"}`}>{item.author || "No Author"}</h3>
                    <h3 className={`text-xs backdrop-blur-lg px-4 py-2 pb-0 ${darkmode ? "text-white" : "text-black"}`}>{item.category}</h3>
                    <h3 className={` backdrop-blur-lg px-4 py-2 ${darkmode ? "text-white" : "text-[#7B4E4E]"} `}>{item.name}</h3>
                </div>
            </div>  
        })}
        </>
    );
}

export { Allbookitem };