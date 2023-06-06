import {
  BrowserRouter as Router,
  Route,
  RouteProps,
  Routes,
} from "react-router-dom";
import routes from "./routes/routes";
import Header from "./components/Layout/Header";

function App() {
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
