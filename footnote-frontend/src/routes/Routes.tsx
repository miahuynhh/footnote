import Login from "../pages/Login/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserHome from "../pages/UserHome/UserHome";
import SignUp from "../pages/SignUp/SignUp";
import ProjectPage from "../pages/ProjectPage/ProjectPageAlicia";
// import CreateNewProject from "../pages/CreateNewProject";
// import HorizontalExample from "../pages/toy";
// import CreateNewProject from "../pages/CreateNewProject";
// import HorizontalExample from "../pages/toy";

export const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/home", element: <UserHome /> },
  { path: "/project", element: <ProjectPage /> },
  { path: "/project/:pid", element: <ProjectPage /> },
  // { path: "/create-new", element: <CreateNewProject /> },
  // { path: "/toy", element: <HorizontalExample /> },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
