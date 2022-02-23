import { AuthRequire, LoginBlock } from "./auth";
import Dashboard from "../pages/Dashboard";
import LoginComponent from "../pages/Login";
import EROR4004 from "../pages/EROR4004";
import ChatRoom from "../pages/ChatRoom";
import { useRoutes } from "react-router-dom";

export default function Router() {
  let element = useRoutes([
    {
      path: "/",
      element: (
        <AuthRequire>
          <Dashboard />
        </AuthRequire>
      ),
      children: [{ path: "/chatroom", element: <ChatRoom /> }],
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
  ]);

  return element;
}
