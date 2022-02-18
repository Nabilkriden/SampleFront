import { AuthRequire, LoginBlock } from "./auth";
import Dashboard from "../pages/Dashboard";
import LoginComponent from "../pages/Login";
import EROR4004 from "../pages/EROR4004";

export const routes = [
  {
    path: "/",
    element: (
      <AuthRequire>
        <Dashboard />
      </AuthRequire>
    ),
  },
  {
    path: "/login",

    element: (
      <LoginBlock>
        <LoginComponent />
      </LoginBlock>
    ),
  },
  {
    path: "*",
    element: <EROR4004 />,
  },
];
