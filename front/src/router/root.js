import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const Loading = <div>Loading...</div>;
const Canvas = lazy(() => import("../pages/Canvas"));
const IndexPage = lazy(() => import("../pages/IndexPage"));

const root = createBrowserRouter([
    {
        path: "",
        element: <Suspense fallback={Loading}><Canvas /></Suspense>,
    },
    {
        path: "index",
        element: <Suspense fallback={Loading}><IndexPage /></Suspense>,
    },
]);

export default root;