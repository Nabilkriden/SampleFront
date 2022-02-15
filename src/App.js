import Dashboard from "./pages/Dashboard";
import LoginComponent from "./pages/Login";
import EROR4004 from "./pages/EROR4004";
import { Routes, Route } from "react-router-dom";

function App() {
  const token = localStorage.getItem("token");
  console.log();
  return (
    <div className="App">
      {token != null ? (
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="*" element={<EROR4004 />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/login" element={<LoginComponent />} />
          <Route path="*" element={<EROR4004 />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
