import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Welcome from "./pages/Welcome/Welcome";
import DashBoard from "./pages/DashBoard/DashBoard";
import Header from "./Header";
function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="welcome" element={<Welcome />} />
        <Route path="dashboard" element={<DashBoard />} />
      </Routes>
    </div>
  );
}
export default App;
