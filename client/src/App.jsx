import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Welcome from "./pages/Welcome/Welcome";
import DashBoard from "./pages/DashBoard/DashBoard";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./Header";
function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/welcome" element={<Welcome />} />

        {/* Private Routes */}
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashBoard />} />
        </Route>
      </Routes>
    </div>
  );
}
export default App;
