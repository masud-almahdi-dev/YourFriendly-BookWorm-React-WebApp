import {createBrowserRouter} from "react-router-dom";
import Layout from "./Layout";
import Home from "../pages/home/Home";

const Routes = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />,
            }
        ]
    },
]);
export default Routes;