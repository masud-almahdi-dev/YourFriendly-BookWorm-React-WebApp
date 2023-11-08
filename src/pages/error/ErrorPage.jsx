import { useEffect } from "react";
import { Link, useLocation, useRouteError } from "react-router-dom";

const ErrorPage = ({message}) => {
    const error = useRouteError()
    const location = useLocation();
    useEffect(()=>{
        document.title = `Error ${error?.status} | Friendly BookWorm`
    },[])
    return (
        <div className={`flex flex-col items-center ${location.state?.errormessage && location.state.errormessage? "":"bg-yellow-300"} w-screen overflow-x h-screen justify-center`}>
            <div className="text-[10vw] bg-white text-blue-700 rounded-lg mb-4 w-max cursor-pointer" aos-data="fade-right">{error? error.status? "✨" + error.status + "🍕":"404":"404"}</div>
            {location?.state?.errormessage && <h4 className="bg-white text-blue-700 rounded-sm" aos-data="fade-right">{location.state.errormessage}</h4>}
            {location?.state?.errormessage? "":
            <h4 className="text-black px-4 rounded-sm" aos-data="fade-right">{error? error.statustext || error.message || "File or Path Not Found":
            "File or Path Not Found"}</h4>}
            <Link to="/" className="bg-green-200 mt-8 text-black px-4 py-2 rounded-sm hover:no-underline transition-all hover:bg-white" aos-data="fade-right"> Home </Link>
        </div>
    );
}

export default ErrorPage;