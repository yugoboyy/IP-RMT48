import {
  createBrowserRouter,
  Outlet,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Register from './views/Register';
import Login from "./views/Login";
import Home from "./views/Home";
import Navbar from "./components/Navbar";
import CharacterDetail from "./views/CharacterDetail";
import MyCharacter from "./views/MyCharacter";
import EditForm from "./views/EditForm";
import AccountDetail from "./views/AccountDetail";

function App() {
  const router = createBrowserRouter([
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
      loader: () => {
        if (localStorage.getItem("access_token")) {
          return redirect("/myCharacters")
        }
        return null
      }
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
          element: <>
            <MyCharacter />
          </>,
          loader: () => {
            if (!localStorage.getItem("access_token")) {
              return redirect("/login")
            }
            return null
          }
        },
        {
          path: "/myCharacter/:name",
          element: <EditForm />,
          loader: () => {
            if (!localStorage.getItem("access_token")) {
              return redirect("/login")
            }
            return null
          }
        },
        {
          path: "/accountDetail",
          element: <AccountDetail />,
          loader: () => {
            if (!localStorage.getItem("access_token")) {
              return redirect("/login")
            }
            return null
          }
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
