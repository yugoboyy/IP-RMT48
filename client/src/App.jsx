import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Register from './views/Register';
import Login from "./views/Login";
import Home from "./views/Home";
import Navbar from "./components/Navbar";
import CharacterDetail from "./views/CharacterDetail";
import MyCharacter from "./views/MyCharacter";
import EditForm from "./views/EditForm";

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
        <Outlet />
      </>,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/myCharacters",
          element: <MyCharacter />
        },
        {
          path: "/myCharacter/:name",
          element: <EditForm />
        },
        {
          path: "/:character",
          element: <CharacterDetail />
        }
      ]
    }
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
