import { RouteProps } from "react-router-dom";
import Home from "../pages/Home";
import Tetris from "../pages/Tetris";
import Betting from "../pages/Betting";
import SubBettingPage from "../pages/Betting/SubBettingPage";
import Profile from "../pages/Betting/Profile";

const routes: RouteProps[] = [
  // {
  //   element: <Home />,
  //   path: "/",
  // },
  {
    element: <Tetris />,
    path: "/tetris",
  },
  {
    element: <Betting />,
    path: "/",
  },
  {
    element: <SubBettingPage />,
    path: "/subbetting",
  },
  {
    element: <Profile />,
    path: "/profile",
  },
];

export default routes;
