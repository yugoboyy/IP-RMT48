import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Register from './views/Register';
import Login from "./views/Login";
import Home from "./views/Home";
import Navbar from "./components/Navbar";

function App() {
  const router = createBrowserRouter([
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
      element: <>
        <Navbar />
        <Home />
      </>,
    }
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
