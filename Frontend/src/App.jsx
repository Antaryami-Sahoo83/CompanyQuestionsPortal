import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import StudentDetails from "./pages/StudentDetails";
import AddStudentDetails from "./pages/AddStudentDetails";
import UpdateStudent from "./pages/UpdateStudent";
import DeleteStudentDetails from "./pages/DeleteStudentDetails";
import SearchStudentDetails from "./pages/SearchStudentDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoutes from "./layout/ProtectedRoutes";
import NotFound from "./pages/NotFound";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/studentdetails", element: <StudentDetails /> },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/",
          element: <ProtectedRoutes />,
          children: [
            {
              path: "/addstudentdetails",
              element: <AddStudentDetails />,
            },
            {
              path: "/updatestudentdetails",
              element: <UpdateStudent />,
            },
            {
              path: "/updatestudent/:id",
              element: <UpdateStudent />,
            },
            {
              path: "/deletestudentdetails",
              element: <DeleteStudentDetails />,
            },
          ],
        },
        {
          path: "/searchstudentdetails",
          element: <SearchStudentDetails />,
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
