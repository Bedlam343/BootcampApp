import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import HomePage from "./pages/Home";
import BootcampsPage, { loader as bootcampsLoader } from "./pages/Bootcamps";
import BootcampDetailPage, {
  loader as bootcampDetailLoader,
} from "./pages/BootcampDetail";
import LoginPage, { action as authAction } from "./pages/Login";
import { action as logoutAction } from "./pages/Logout";
import NewBootcampPage from "./pages/NewBootcamp";
import BootcampsRootLayout from "./pages/BootcampsRoot";

import AuthContextLayout from "./store/AuthContextLayout";

const router = createBrowserRouter([
  {
    // provide AuthContext to all routes
    element: <AuthContextLayout />,
    children: [
      {
        path: "/",
        element: <RootLayout />,
        id: "root",
        children: [
          { index: true, element: <HomePage /> },
          {
            path: "bootcamps",
            element: <BootcampsRootLayout />,
            children: [
              {
                index: true,
                element: <BootcampsPage />,
                loader: bootcampsLoader,
              },
              {
                path: ":bootcampId",
                element: <BootcampDetailPage />,
                loader: bootcampDetailLoader,
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
            action: authAction,
          },
          {
            path: "logout",
            action: logoutAction,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
