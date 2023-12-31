import {createBrowserRouter} from "react-router-dom";
import Layout from "./Layout";
import Home from "../pages/home/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import PrivateRoute from "../pages/auth/PrivateRoute";
import ErrorPage from "../pages/error/ErrorPage";
import Category from "../pages/category/Category";
import BookDetails from "../pages/book/BookDetails";
import AllBooks from "../pages/book/AllBooks";
import UpdateBook from "../pages/book/UpdateBook";
import AddBook from "../pages/book/AddBook";
import ReadPage from "../pages/book/ReadPage";
import BorrowedBooks from "../pages/cart/BorrowedBooks";

const Routes = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/error",
                element: <ErrorPage />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Register />,
            },
            {
                path: "/cart",
                element: <PrivateRoute><BorrowedBooks /></PrivateRoute>,
            },
            {
                path: "/books",
                element: <AllBooks />
            },
            {
                path: "/add",
                element: <PrivateRoute><AddBook /></PrivateRoute>,
            },
            {
                path: "/category/:id",
                element: <Category />,
                loader: ({ params }) => params.id 
            },
            {
                path: "/book/:id",
                element: <PrivateRoute><BookDetails/></PrivateRoute>,
                loader: ({ params }) => params.id 
            },
            {
                path: "/update/:id",
                element: <PrivateRoute><UpdateBook/></PrivateRoute>,
                loader: ({ params }) => params.id 
            },
            {
                path: "/content/:id",
                element: <PrivateRoute><ReadPage/></PrivateRoute>,
                loader: ({ params }) => params.id 
            },
        ]
    },
]);
export default Routes;