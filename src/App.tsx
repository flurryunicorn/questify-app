import {
  BrowserRouter as Router,
  Route,
  RouteProps,
  Routes,
} from "react-router-dom";
import routes from "./routes/routes";
import Header from "./components/Layout/Header";
import Home from "./pages/Home";
import Tetris from "./pages/Tetris";
import { useEffect } from "react";
// import socket from "./utils/socket-client";
import { ProSidebarProvider } from "react-pro-sidebar";

function App() {
  // useEffect(() => {
  //   (window as any).socket = socket();
  // }, []);
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          {routes.map((route: RouteProps) => (
            <Route key={`routes-${route.path}`} {...route} />
          ))}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
