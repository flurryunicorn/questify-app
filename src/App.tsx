import {
  BrowserRouter as Router,
  Route,
  RouteProps,
  Routes,
} from "react-router-dom";
import routes from "./routes/routes";
import Header from "./components/Layout/Header";
import ScrollToTop from "react-scroll-to-top";

function App() {
  return (
    <div>
      {/* <ScrollToTop
        smooth
        style={{ borderRadius: "20px", background: "black" }}
      /> */}
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
