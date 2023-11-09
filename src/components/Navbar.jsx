import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../authentication/Authentication";
import { useContext, useEffect, useState } from "react";
import {useDarkMode} from "../darkmode/darkMode";
import useAxiosSecure from "../authentication/useaxiossecure";

const Navbar = ({ children }) => {
    const { user, logOut } = useAuth();
    const [userdata,setuserdata] = useState({});
    const [loadeduser,setloadeduser] = useState(false);
    const axiosSecure = useAxiosSecure()
    const location = useLocation();
    const { darkmode, setDarkMode } = useDarkMode();
    const links = [
        <NavLink key="0" to="/">Home</NavLink>,
        <NavLink key="1" to="/books">All Books</NavLink>,
        <NavLink key="2" to="/cart">Borrowed Books</NavLink>,
        <NavLink key="3" to="/add">Add Book</NavLink>,
        !user && <NavLink key="4" to="/login">Log In</NavLink>,
        user && <NavLink key="5" onClick={logOut}>Sign Out</NavLink>
    ]
    const handledarkmode = (e) => {
        if (e.target.checked) {
            localStorage.setItem("darkmode", "true");
            setDarkMode(true)
        } else {
            localStorage.setItem("darkmode", "false");
            setDarkMode(false)
        }
    }
    useEffect(()=>{
        if(user!==null && user!==undefined){
            const data = {email: user.email}
        }
    },[])
    useEffect(()=>{
        userdata && setloadeduser(true)
    },[userdata])
    useEffect(() => {
        const darkmodetoggleswitch = document.getElementById("darkmodetoggleswitch")
        if (darkmode === true) {
            if (darkmodetoggleswitch) {
                darkmodetoggleswitch.setAttribute("checked", "true")
                darkmodetoggleswitch.addEventListener("change", handledarkmode);
                setDarkMode(darkmode)
            }
        } else if (darkmode === false) {
            if (darkmodetoggleswitch) {
                darkmodetoggleswitch.removeAttribute("checked", "false")
                darkmodetoggleswitch.addEventListener("change", handledarkmode);
                setDarkMode(darkmode)
            }
        } else if (darkmode === undefined) {
            const dm = localStorage.getItem("darkmode");
            if (dm === undefined || dm === null) {
                localStorage.setItem("darkmode", "true");
                setDarkMode(true);
            } else if (dm === "false") {
                setDarkMode(false);
            } else if (dm === "true") {
                setDarkMode(true);
            }
        }
    }, [darkmode])
    if (location.pathname === "/login" || location.pathname === "/signup") {
        return (
            <div>
                <div className="dropdown dropdown-end absolute top-0 lg:mr-20 mt-12 right-0">
                    <label tabIndex={0} className="cursor-pointer">
                        <img src="/menu.png" alt="" className={`h-10 pr-6 py-2 lg:h-16 lg:p-4 `} />
                    </label>
                    <ul tabIndex={0} className="dropdown-content z-[30] menu p-2 shadow bg-base-100 rounded-box w-max">
                        {links.filter((i) => { return i?.key ? true : false }).map((elem, i) => {
                            return <li key={i} className="w-full hover:bg-[#ddcccc] rounded-lg">{elem}</li>
                        })}
                    </ul>
                </div>
                {children}
            </div>
        );
    } else {
        if (darkmode !== undefined && links.length > 0) {
            return (
                <div className=" overflow-hidden">
                    <img src="https://i.ibb.co/QrrW668/left.png" alt="" className="top-0 absolute left-0 w-[25vw] z-[1]" />
                    <img src="https://i.ibb.co/K2J9NVK/right.png" alt="" className="top-0 absolute right-0 w-[25vw] -translate-y-10 z-[1]" />
                    <div className="flex justify-between">
                        <div className="flex flex-col w-max">
                            <div className="dropdown navigation-dropdown w-max top-12 mr-6 left-[2rem] z-[5]">
                                <label tabIndex={0} className="cursor-pointer">
                                    <img src="/menu.png" alt="" className={`h-10 py-2 lg:h-16 lg:p-4  px-2 rounded-lg ${darkmode ? "bg-[#d9d9d9]" : "bg-white"}`} />
                                </label>
                                <ul tabIndex={0} className={`dropdown-content z-[30] menu p-2 shadow ${darkmode ? "bg-slate-700 text-white" : "bg-base-100"} rounded-box w-max`}>
                                    {links.filter((i) => { return i?.key ? true : false }).map((elem, i) => {
                                        return <li key={i} className="w-full hover:bg-[#ddcccc] rounded-lg">{elem}</li>
                                    })}
                                </ul>
                            </div>
                            {user &&
                                <div className={`flex absolute mt-24 md:mt-28 ${darkmode ? "text-white" : ""} flex-col md:flex-row rounded-xl font-bruno-sc p-2 ml-6 md:pb-4 md:pr-8 z-[4] gap-4`}>
                                    {userdata.picture? <img src={userdata.picture} alt="" className="rounded-xl w-16 h-16" />:user.photoURL? <img src={user.photoURL} alt="" className="rounded-xl w-16 h-16" />:""}
                                    <div className="flex md:flex-col flex-col-reverse text-center md:text-left">
                                        <button className="bg-[#430B0B] text-white p-2 w-max rounded-md text-xs md:mb-2" onClick={logOut}>Sign Out</button>
                                        <h2 className="text-sm md:flex hidden bg-white/75 text-black px-2 rounded-md">{userdata===undefined? user.displayName:userdata.name}</h2>
                                        <h2 className="text-sm md:flex hidden bg-white/75 text-black px-2 rounded-md">{[""].map(() => {
                                            return user.email.split('@')[0].slice(0, 4) + "......@" + user.email.split('@')[1]
                                        })}
                                        </h2>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className=" w-[60vw] md:w-max">
                            <div className=" mt-12 mb-6 flex justify-center items-center">
                                {/* <div className="bg-red-500 absolute pointer-events-none rounded-md w-[60vw] lg:w-[466px] translate-y-2 md:min-w-[522px] max-w-[90vw] px-4 py-2 scale-95 text-red-500 z-[2]"> a</div>
                                <div className="flex z-[3]">
                                    <input type="text" placeholder="SEARCH..." className={` ${darkmode ? "bg-[#d9d9d9]" : "bg-white"} rounded-md w-[60vw] lg:w-[466px] md:min-w-[522px] max-w-[90vw] px-4 py-2 pr-10  placeholder:text-black`} />
                                    <img src="/arrow.svg" className="-translate-x-4 -ml-4 hover:rotate-[135deg] cursor-pointer transition-all duration-150" alt="" />
                                </div> */}
                            </div>
                            {location.pathname === "/" && <h1 className={`md:text-6xl sm:text-5xl text-4xl text-center ${darkmode && "invert"}`}>YOUR FRIENDLY<br />BOOKWORM</h1>}
                            <div className="gap-4 navigation-links sm:mt-4 md:mt-8 flex-wrap md:flex-nowrap justify-center sm:flex hidden">{links}</div>
                        </div>
                        <label className="swap swap-rotate top-12 mr-6 w-10 h-10 right-[4px] z-[2]">
                            <input id="darkmodetoggleswitch" type="checkbox" />
                            <img src="/darkmode.svg" className="swap-on fill-current w-full h-full"></img>
                            <img src="/lightmode.svg" className="swap-off fill-current w-full h-full" ></img>
                        </label>
                    </div>

                    <div className=" w-full mt-2">
                        {children}
                    </div>

                </div>
            );
        }
    }
}

export default Navbar;