import { useEffect, useState } from "react";
import Slider from "../../components/Slider";
import useDarkMode from "../../darkmode/darkMode";
import axios from "axios";
import { useAuth } from "../../authentication/Authentication";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const { darkmode, setDarkMode } = useDarkMode();
    const {user} = useAuth();
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [failed, setFailed] = useState(true);
    useEffect(() => {
        document.title = "Home | Friendly BookWorm"
        axios.get(`${import.meta.env.VITE_SERVER_URI}/categories`).then(data => { setFailed(false); setCategories(data.data); }).catch(() => { setFailed(true); })
    }, [])
    const handleViewCategory = (id) => {
        navigate(`/category/${id}`);
    }
    const banners = [
        { image: "https://i.ibb.co/SnNvZRP/banner1.png", title: "FOREVER IS WITHIN URSELF", details: "YOU JUST HAVE TO FIND IT IN THOSE BOOKS OF OLD" },
        { image: "https://i.ibb.co/vk5crgQ/banner2.jpg", title: "FOREVER IS WITHIN URSELF", details: "YOU JUST HAVE TO FIND IT IN THOSE BOOKS OF OLD" },
        { image: "https://i.ibb.co/GCJGfCn/banner3.jpg", title: "FOREVER IS WITHIN URSELF", details: "YOU JUST HAVE TO FIND IT IN THOSE BOOKS OF OLD" },
    ]
    return (
        <>
            <div className="container mx-auto flex flex-col items-center justify-center" data-aos="fade-up">
                <Slider items={banners} className="w-full h-[30vh] rounded-lg" textbg="font-outline-2 -mb-2" titlesize="text-2xl font-medium md:font-bold" descsize="hidden md:block text-2xl" />
                <h2 className={`${darkmode ? "text-white" : "text-black"} text-center text-3xl scale-90 md:text-4xl mb-2`}>“FIND YOUR INNER BOOKWORM”</h2>
                <h4 className={`${darkmode ? "text-white" : "text-black"} text-center text-xs md:text-sm lg:mb-[2rem]`}>- c.e.o  of Your Friendly Bookworms 2023</h4>
                <div className={`flex items-center rounded-[1.5rem] justify-between gap-[4.12rem] lg:gap-[10vw] scale-50 md:scale-75 p-[2rem] lg:scale-100 ${!darkmode && "bg-[#472D2E]"}`}>
                    <div className={`w-[12.1875rem] rounded-xl ${darkmode && "bg-[#FFEFE0]"} flex justify-center items-center`} data-aos="fade-right">
                        <img src="https://i.ibb.co/vYw8rtJ/label1.png" alt="" className="w-[9rem]" />
                    </div>
                    <img src="/divider.svg" alt="" />
                    <h2 className={`text-white text-3xl w-[12.1875rem] text-center lg:text-left`}>CATEGORIES:</h2>
                </div>
                <div className="grid lg:grid-cols-2 grid-cols-1 p-6 justify-center gap-12 items-center">
                    {failed && "loading categories failed..."}
                    {!failed &&
                        categories.map(
                            (i, key) => {
                                return (
                                    <div key={key} className="w-full rounded-lg overflow-hidden aspect-video flex justify-center items-center text-center" data-aos={key % 2 ? "fade-left" : "fade-right"}>
                                        <img src={i.image} className="w-full object-cover"></img>
                                        <div className="absolute translate-y-4" data-aos={key % 2 ? "fade-left" : "fade-right"}>
                                            <h2 className="text-4xl xl:text-6xl text-white rounded-lg p-4 backdrop-blur-lg">{i.title}</h2>
                                            <button className="bg-yellow-400 rounded-lg p-2 px-4 mt-2 text-sm" onClick={() => { handleViewCategory(i._id) }}>VIEW BOOKS</button>
                                        </div>
                                    </div>
                                )
                            }
                        )
                    }
                </div>
                <div className={`${!darkmode ? "bg-[linear-gradient(264deg,_#98C23E_7.5%,_#FFF_84.74%)]" : "bg-[linear-gradient(264deg,_#0D566D_7.5%,_rgba(36,_92,_144,_0.00)_84.74%)] text-white"} flex-col-reverse lg:flex-row flex justify-between w-full max-w-[80vw] overflow-hidden xl:h-[30rem] rounded-[2rem] mt-[4rem]`} data-aos="fade-up">
                    <div className=" px-[5rem] py-[4rem]">
                        <h5>VARIOUS INDEPENDANT STUDIES SUGGEST THAT:-</h5>
                        <h4 className="text-3xl">READING A BOOK BEFORE SLEEP IMPROVES YOUR</h4>
                        <h4 className={`${darkmode ? "text-[#63E3FF]" : "text-[#0E6042]"} text-3xl  mb-2`}>
                            SLEEP QUALITY<br />
                            PHYSICAL FITNESS &<br />
                            COGNITIVE ABILITY
                        </h4>
                        <h5>WHICH IN TURN IMPROVES YOUR MOOD AND WORK EFFICIENCY</h5>
                        <button className="px-4 py-2 bg-white text-[#430B0B] transition-colors hover:bg-[#f0e6e6] mt-4 rounded-md">All Books</button>
                    </div>
                    <img src="https://i.ibb.co/NyN3W3m/banner4.png" alt="" className=" object-cover" />
                </div>
            </div>
            <footer className="bg-[#430B0B] mt-8 text-white w-full">
                <div className="container flex justify-between mx-auto p-10">
                    <div>
                        <h3>
                            Hello World!
                        </h3>
                        <h2 className="text-4xl">
                            Friendly-#<br />
                            BookWorm
                        </h2>
                    </div>
                    <div>
                        {user &&
                            <>
                                <h3>
                                    Welcome!
                                </h3>
                                <h2 className="text-4xl">
                                    {user.displayName}
                                </h2>
                            </>
                        }
                        <h3>
                            Contact:
                        </h3>
                        <h2 className="text-4xl">
                            01#-#####-###
                        </h2>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Home;