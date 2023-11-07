import { useEffect } from "react";
import Slider from "../../components/Slider";

const Home = () => {
    useEffect(()=>{
        document.title = "Home | Friendly BookWorm"
    },[])
    const banners = [
        {image:"/banner1.png",title: "FOREVER IS WITHIN URSELF", details: "YOU JUST HAVE TO FIND IT IN THOSE BOOKS OF OLD"},
        {image:"/banner2.jpg",title: "FOREVER IS WITHIN URSELF", details: "YOU JUST HAVE TO FIND IT IN THOSE BOOKS OF OLD"},
        {image:"/banner3.jpg",title: "FOREVER IS WITHIN URSELF", details: "YOU JUST HAVE TO FIND IT IN THOSE BOOKS OF OLD"},
    ]
    return (
        <div className="container mx-auto">
            <Slider items={banners} className="w-full h-[30vh] rounded-lg" textbg="font-outline-2 -mb-2" titlesize="text-2xl font-medium md:font-bold" descsize="hidden md:block text-2xl" />
            <h1 className="text-3xl font-bold underline">
                
            </h1>
        </div>
    );
}

export default Home;