import { NavLink, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../authentication/useAuth";

const Navbar = () => {
    const {user,logOut} = useAuth();
    const links = <>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/cart">All Books</NavLink>
        <NavLink to="/cart">Borrowed Books</NavLink>
        <NavLink to="/cart">Add Book</NavLink>
        { !user && <NavLink to="/login">Login</NavLink>}
        {user && <NavLink onClick={logOut}>Sign Out</NavLink>}
    </>
    return (
        <div>
            <div className="flex gap-4 ">{links}</div>
        </div>
    );
}

export default Navbar;