import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const Loading = <div>Loading...</div>;
const Index = lazy(() => import("../pages/IndexPage"));

const root = createBrowserRouter([
    {
        path: "",
        element: <Suspense fallback={Loading}><Index /></Suspense>,
    },
]);

export default root;