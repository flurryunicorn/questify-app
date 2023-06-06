import { RouteProps } from "react-router-dom";
import Betting from "../pages/Betting";
import SubBettingPage from "../pages/Betting/SubBettingPage";
import Quests from "../pages/Quests";

const routes: RouteProps[] = [
  {
    element: <Betting />,
    path: "/",
  },
  {
    element: <SubBettingPage />,
    path: "/subbetting",
  },

  {
    element: <Quests />,
    path: "/quests",
  },
];

export default routes;
