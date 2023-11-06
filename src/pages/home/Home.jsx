import { useEffect } from "react";

const Home = () => {
    useEffect(()=>{
        document.title = "Home | Friendly BookWorm"
    },[])
    return (
        <div>
            <h1 className="text-3xl font-bold underline">
                Hello world!
            </h1>
        </div>
    );
}

export default Home;