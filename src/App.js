import { useRoutes } from "react-router-dom";
import { routes } from "./service/routes";

function App() {
  const route = useRoutes(routes);
  return <div className="App">{route}</div>;
}

export default App;
