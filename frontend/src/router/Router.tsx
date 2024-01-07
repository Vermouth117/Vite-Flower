import { memo } from "react";
import { Route, Routes } from "react-router-dom";

import { homeRoutes } from "./HomeRoutes";
import HeaderLayout from "../components/templates/HeaderLayout";

const Router = memo(() => {
  return (
    <Routes>
      <Route
        path="/*"
        element={
          <Routes>
            {homeRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<HeaderLayout children={route.children} />}
              />
            ))}
          </Routes>
        }
      />
    </Routes>
  );
});

export default Router;
