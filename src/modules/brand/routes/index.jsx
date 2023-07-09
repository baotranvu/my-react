import { loader } from "./loader";
import Index from "../pages/index";
import Create from "../pages/create";
const routes = [
    {
        path: "/brand",
        element: <Index />,
        loader: loader.indexLoader(),
        children: [
            {
                path: "create",
                element: <Create />,
                loader: loader.createLoader()
            }
        ]
    }
]

export default routes;