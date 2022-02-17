import Dashboard from "./pages/Dashboard";
import LoginComponent from "./pages/Login";
import EROR4004 from "./pages/EROR4004";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const [token, setToken] = useState("");
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  console.log();
  return (
    <div className="App">
      {token !== null ? (
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<LoginComponent />} />
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
