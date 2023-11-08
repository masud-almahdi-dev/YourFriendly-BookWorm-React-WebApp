import axios from "axios";
import { useEffect, useState } from "react";
import useDarkMode from "../../darkmode/darkMode";
import { useLoaderData, useNavigate } from "react-router-dom";

const ReadPage = () => {
    const loaded = useLoaderData()
    const [failed, setFailed] = useState(true);
    const [inputvisible, setinputvis] = useState(false);
    const [book, setBook] = useState({});
    const { darkmode, setDarkMode } = useDarkMode();
    const navigate = useNavigate()
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_SERVER_URI}/book/${loaded}`).then(data => {
            if (data?.data?._id === loaded) {
                setFailed(false);
                document.title = data.data.title + " | Friendly BookWorm"
                console.log(data.data)
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
    const handleupdatecontent = ()=>{
        const data =  { "content": document.getElementById("bookcontent").value }
        axios.patch(`${import.meta.env.VITE_SERVER_URI}/content/${loaded}`,data).then(res=>console.log(data.data)).catch(e=>console.log(e))
    }
    return (
        <div className="">
            <div className="container mx-auto mt-36 text-white px-6">
                {!failed &&
                    <p className="bg-[#d9d9d9] text-black">{book?.read === undefined || book?.read === null ? "no content" : book.read}</p>
                }
                {inputvisible &&
                    <div className="flex flex-col gap-4 text-black">
                        <textarea id="bookcontent" className="w-full h-[20vh] rounded-md" />
                        <button onClick={handleupdatecontent} className="btn ml-4">update</button>
                    </div>}
                <button onClick={() => { setinputvis(!inputvisible) }} className="btn mt-4" >{inputvisible ? "Hide inputs" : "Update content"}</button>
            </div>
        </div>
    );
}

export default ReadPage;