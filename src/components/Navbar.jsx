import { NavLink, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../authentication/useAuth";

const Navbar = ({ children }) => {
    const { user, logOut } = useAuth();
    const location = useLocation();
    const links = [
        <NavLink key="0" to="/">Home</NavLink>,
        <NavLink key="1" to="/cart">All Books</NavLink>,
        <NavLink key="2" to="/cart">Borrowed Books</NavLink>,
        <NavLink key="3" to="/cart">Add Book</NavLink>,
        !user && <NavLink key="4" to="/login">Login</NavLink>,
        user && <NavLink key="5" onClick={logOut}>Sign Out</NavLink>
    ]
    if (location.pathname === "/login" || location.pathname === "/signup") {
        return (
            <div>
                <div className="dropdown dropdown-end absolute top-0 lg:mr-20 mt-12 right-0">
                    <label tabIndex={0} className="cursor-pointer">
                        <img src="/menu.png" alt="" className="h-10 pr-6 py-2 lg:h-16 lg:p-4" />
                    </label>
                    <ul tabIndex={0} className="dropdown-content z-[30] menu p-2 shadow bg-base-100 rounded-box w-max">
                        {links.map((elem, i) => <li key={i} className="w-full">{elem}</li>)}
                    </ul>
                </div>
                {children}
            </div>
        );
    } else {
        return (
            <div>
                <img src="/left.png" alt="" className="absolute top-0 left-0 w-[25vw] -z-10" />
                <img src="/right.png" alt="" className="absolute top-0 right-0 w-[25vw] -translate-y-10 -z-10" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] md:w-max">
                    <div className="bg-red-500 pointer-events-none rounded-md w-full md:min-w-[522px] max-w-[90vw] absolute mt-14 px-4 py-2 scale-95 text-red-500 -z-[5]"> a</div>
                    <div className=" mt-12 mb-6 flex justify-end items-center">
                        <input type="text" placeholder="SEARCH..." className="bg-[#d9d9d9] rounded-md w-full md:min-w-[522px] max-w-[90vw] px-4 py-2 pr-10 placeholder:text-black" />
                        <img src="/arrow.svg" className="absolute -translate-x-2 hover:rotate-[135deg] cursor-pointer transition-all duration-150" alt="" />
                    </div>
                    <h1 className="md:text-6xl sm:text-5xl text-4xl text-center">YOURFRIENDLY<br />BOOKWORM</h1>
                    <div className="gap-4 navigation-links sm:mt-4 md:mt-8 flex-wrap md:flex-nowrap justify-center sm:flex absolute hidden">{links}</div>
                </div>
                <div className="dropdown dropdown-end absolute top-0 lg:mr-20 mt-12 right-0">
                    <label tabIndex={0} className="cursor-pointer">
                        <img src="/menu.png" alt="" className="h-10 pr-6 py-2 lg:h-16 lg:p-4" />
                    </label>
                    <ul tabIndex={0} className="dropdown-content z-[30] menu p-2 shadow bg-base-100 rounded-box w-max">
                        {links.map((elem, i) => <li key={i} className="w-full">{elem}</li>)}
                    </ul>
                </div>
                <div className="mt-[13rem] sm:mt-[20rem]">
                    {children}
                </div>
            </div>
        );
    }
}

export default Navbar;