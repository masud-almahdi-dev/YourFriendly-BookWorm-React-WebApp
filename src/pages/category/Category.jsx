import axios from "axios";
import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useDarkMode } from "../../darkmode/darkMode";
import Rating from "react-rating";

const Category = () => {
    const loaded = useLoaderData()
    const [failed, setFailed] = useState(true);
    const [category, setCategory] = useState({});
    const { darkmode, setDarkMode } = useDarkMode();
    const navigate = useNavigate()
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_SERVER_URI}/category/${loaded}`).then(data => {
            if (data?.data?._id === loaded) {
                setFailed(false);
                document.title = data.data.title + " | Friendly BookWorm"
                setCategory(data.data);
            } else {
                const st = { errormessage: "Category id: " + loaded + ", No Such Category." }
                navigate("/error", { state: st });
            }
        }).catch((e) => { console.log(e); setFailed(true); })
    }, [])
    const handledetails = (id) => {
        navigate(`/book/${id}`);
    }
    const handleupdate = (id) => {
        navigate(`/update/${id}`);
    }
    return (
        <div className="">
            <div className="container mx-auto mt-36 text-white px-6">
                {!failed &&
                    <div className="flex justify-center items-center w-full rounded-lg overflow-hidden">
                        <img src={category.image} className="w-full aspect-video object-cover contrast-125 saturate-150 brightness-110" alt="" />
                        <h1 className="absolute text-2xl lg:text-4xl backdrop-blur-lg px-4 py-2 ">{category.title}</h1>
                    </div>
                }
                {!failed && category.items.length > 0 ?
                    <div className="grid grid-cols-1 lg:grid-cols-2 p-4 gap-4">
                        {category.items.map(
                            (item, index) => {
                                return (
                                    <div key={index} className="flex justify-start items-end w-full gap-2">
                                        <img src={item.image ? item.image : "https://i.ibb.co/HXPcQ1d/defaultbook.jpg"} className="h-[40vh] rounded-lg overflow-hidden aspect-[9/12] object-cover contrast-125 saturate-150 brightness-110" alt="" />
                                        <div className="flex flex-col gap-4">
                                            <button className={`bg-blue-700 w-max ml-4 rounded-lg px-4 py-2 hover:brightness-125 transition-all hover:saturate-50`} onClick={() => { handleupdate(item._id) }}>Update</button>
                                            <button className={`bg-blue-500 w-max ml-4 rounded-lg px-4 py-2 hover:brightness-125 transition-all hover:saturate-50`} onClick={() => { handledetails(item._id) }}>Details</button>
                                            <Rating initialRating={3} readonly
                                                emptySymbol={<img src="/star1.png" className="w-10 grayscale opacity-60" />}
                                                fullSymbol={<img src="/star1.png" className="w-10" />}
                                            />
                                            <h3 className={`text-xs backdrop-blur-lg px-4 py-2 pb-0 ${darkmode ? "text-white" : "text-black"}`}>{item.author || "AVB"}</h3>
                                            <h3 className={`text-lg lg:text-4xl backdrop-blur-lg px-4 py-2 ${darkmode ? "text-white" : "text-[#7B4E4E]"} `}>{item.title}</h3>
                                        </div>
                                    </div>
                                );
                            }
                        )}
                    </div>
                    :
                    <h1 className="">Hmm<br />No books in this category.</h1>
                }
            </div>
        </div>
    );
}

export default Category;