import axios from "axios";
import { useEffect, useState } from "react";
import useDarkMode from "../../darkmode/darkMode";
import { useLoaderData, useNavigate } from "react-router-dom";

const BookDetails = () => {
    const loaded = useLoaderData()
    const [failed, setFailed] = useState(true);
    const [book, setBook] = useState({});
    const { darkmode, setDarkMode } = useDarkMode();
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
    function handleborrow() {
        
    }
    return (
        <div className="">
            <div className="container mx-auto mt-36 text-white px-6">
                {!failed &&
                    <div>
                        <div className="flex justify-center gap-4 items-center lg:justify-start lg:items-start w-full rounded-lg overflow-hidden">
                            <img src={book.picture} className="w-full lg:w-1/2 aspect-video object-cover rounded-lg overflow-hidden contrast-125 saturate-150 brightness-110" alt="" />
                            <h1 className="absolute text-2xl lg:text-4xl backdrop-blur-lg lg:mt-4 px-4 py-2 rounded-lg overflow-hidden lg:p-8 ">{book.title}</h1>
                            <div>
                                <h2>{book.name}</h2>
                                <h2>{book.details}</h2>
                            </div>
                        </div>
                        <div className="flex flex-col lg:flex-row items-center justify-center p-4 gap-4">
                        <button className="bg-yellow-400 px-4 py-2 rounded-md hover:saturate-50 hover:brightness-75 text-black" onClick={handleborrow}>BORROW</button>
                        <button className="bg-red-400 px-4 py-2 rounded-md hover:saturate-50 hover:brightness-75 text-black">READ</button>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default BookDetails;