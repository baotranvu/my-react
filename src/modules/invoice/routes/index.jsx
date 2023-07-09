import { loader } from "./loader";
import Index from "../pages/index";
import CreateLong from "../pages/createLong";
import CreateShort from "../pages/createShort";

const routes = [
    {
        path: "/invoice",
        element: <Index />,
        loader: loader.indexLoader(),
        
    },
    
    {
        path: "invoice/create-short",
        element: <CreateShort />,
        loader: loader.createLoader()
    },
    {
        path: "invoice/create-long",
        element: <CreateLong />,
        loader: loader.createLoader()
    }
]

export default routes;