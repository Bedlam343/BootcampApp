import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import HomePage from "./pages/Home";
import BootcampsPage from "./pages/Bootcamps";
import BootcampDetailPage from "./pages/BootcampDetail";
import LoginPage from "./pages/Login";
import NewBootcampPage from "./pages/NewBootcamp";
import BootcampsRootLayout from "./pages/BootcampsRoot";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "bootcamps",
        element: <BootcampsRootLayout />,
        children: [
          {
            index: true,
            element: <BootcampsPage />,
          },
          {
            path: ":bootcampId",
            element: <BootcampDetailPage />,
          },
          {
            path: "new",
            element: <NewBootcampPage />,
          },
        ],
      },
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;