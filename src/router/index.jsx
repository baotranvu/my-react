import { Routes, Route } from "react-router-dom";
import userRoutes from "@modules/user/routes";
import brandRoutes from "@modules/brand/routes";
import contractRoutes from "@modules/contract/routes";
import storeRoutes from "@modules/store/routes";
import invoiceRoutes from "@modules/invoice/routes";
const routes = [
    ...userRoutes,
    ...brandRoutes,
    ...contractRoutes,
    ...storeRoutes,
    ...invoiceRoutes
]


export default function Router() {

    return (
        <Routes>
            {routes.map(({ path, element, children }) => (
                <Route key={path} path={path} element={element}>
                    {children && children.map(({ path, element }) => (
                        <Route key={path} path={path} element={element} />
                    ))}
                </Route>
            ))}
        </Routes>
    )
}

