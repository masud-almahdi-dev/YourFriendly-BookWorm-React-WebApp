import axios from "axios";
import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useDarkMode } from "../../darkmode/darkMode";
import Rating from "react-rating";
import useAxiosSecure from "../../authentication/useaxiossecure";
import { Allbookitem } from "../book/bookfunctions";

const Category = () => {
    const loaded = useLoaderData()
    const [failed, setFailed] = useState(true);
    const [category, setCategory] = useState({});
    const axiosSecure = useAxiosSecure()
    const { darkmode, setDarkMode } = useDarkMode();
    const navigate = useNavigate()
    useEffect(() => {
        axiosSecure.get(`/category/${loaded}`).then(data => {
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
                        <Allbookitem arr={category.items}/>
                    </div>
                    :
                    <h1 className="">Hmm<br />No books in this category.</h1>
                }
            </div>
        </div>
    );
}

export default Category;