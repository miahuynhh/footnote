import Login from "../pages/Login/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "../pages/SignUp/SignUp";
import AnnotationPage from "../pages/AnnotationPage";
import UserHome from "../pages/UserHome/UserHome";
import ProjectPage from "../pages/ProjectPage";

export const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/home", element: <UserHome /> },
  { path: "/project", element: <AnnotationPage /> },
  { path: "/project/:pid", element: <ProjectPage /> },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
