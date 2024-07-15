import { createBrowserRouter } from "react-router-dom";

// import routing components
import Home from "../pages/Home.js";
import MainLayout from "../components/layout/MainLayout";
import Transcript from "../pages/Transcript.js";
import Update from "../pages/Update.js";

const MainRoutes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/update/:id",
        element: <Update />,
      },
      {
        path: "/transcript",
        element: <Transcript />,
      },
    ],
  },
]);

export default MainRoutes;
