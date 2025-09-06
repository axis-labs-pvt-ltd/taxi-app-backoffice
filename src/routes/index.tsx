import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate,
} from "react-router-dom";
import { MainRoutes } from "../data/route.data";
import { RootState } from "../redux/store";
import { routes } from "./routeConfig";

const NavigationHandler = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const authRoutes: string[] = [MainRoutes.login, MainRoutes.signup];
    if (!isAuthenticated && !authRoutes.includes(window.location.pathname)) {
      navigate(MainRoutes.login);
    } else if (
      isAuthenticated &&
      authRoutes.includes(window.location.pathname)
    ) {
      navigate(MainRoutes.dashboard);
    }
  }, [isAuthenticated, navigate]);

  return null;
};

const Routers = () => {
  return (
    <Router>
      <NavigationHandler />
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element}>
            {route.children?.map((childRoute, childIndex) => (
              <Route
                key={childIndex}
                path={childRoute.path}
                element={childRoute.element}
              />
            ))}
          </Route>
        ))}
      </Routes>
    </Router>
  );
};

export default Routers;
