import { useEffect } from "react";
import { Link, useLocation, useRouteError } from "react-router-dom";

const ErrorPage = ({message}) => {
    const error = useRouteError()
    const location = useLocation();
    useEffect(()=>{
        document.title = `Error ${error?.status} | Friendly BookWorm`
    },[])
    return (
        <div className="flex flex-col items-center gap-4 w-screen overflow-x h-screen justify-center">
            <div className="text-[10vw] bg-blue-300 text-blue-700 py-4 px-8 rounded-lg w-max cursor-pointer" aos-data="fade-right">{error? error.status? error.status:"404":"404"}</div>
            {location?.state?.errormessage && <h4 className="bg-white text-blue-700 px-4 py-2 rounded-sm" aos-data="fade-right">{location.state.errormessage}</h4>}
            {location?.state?.errormessage? "":
            <h4 className="bg-white text-blue-700 px-4 py-2 rounded-sm" aos-data="fade-right">{error? error.statustext || error.message || "File or Path Not Found":
            "File or Path Not Found"}</h4>}
            <Link to="/" className="bg-white text-blue-700 underline px-4 py-2 rounded-sm hover:no-underline transition-all hover:bg-blue-200" aos-data="fade-right"> Home </Link>
        </div>
    );
}

export default ErrorPage;