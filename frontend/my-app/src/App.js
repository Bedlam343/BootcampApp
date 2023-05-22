import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import HomePage from "./pages/Home";
import BootcampsPage, { loader as bootcampsLoader } from "./pages/Bootcamps";
import BootcampDetailPage, {
  action as deleteBootcampAction,
} from "./pages/BootcampDetail";
import LoginPage, { action as authAction } from "./pages/Login";
import { action as logoutAction } from "./pages/Logout";
import NewBootcampPage, {
  action as newBootcampAction,
} from "./pages/NewBootcamp";
import BootcampsRootLayout from "./pages/BootcampsRoot";
import BootcampDetailLayout, {
  loader as bootcampLoader,
} from "./pages/BootcampDetailRoot";
import AuthContextLayout from "./store/AuthContextLayout";
import EditBootcampPage from "./pages/EditBootcamp";

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
                element: <BootcampDetailLayout />,
                id: "bootcampDetail",
                loader: bootcampLoader,
                children: [
                  {
                    index: true,
                    element: <BootcampDetailPage />,
                    action: deleteBootcampAction,
                  },
                  {
                    path: "edit",
                    element: <EditBootcampPage />,
                  },
                ],
              },
              {
                path: "new",
                element: <NewBootcampPage />,
                action: newBootcampAction,
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
