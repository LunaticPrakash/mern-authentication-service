import './App.css';
import LoginPage from "./pages/LoginPage.js";
import RegisterPage from "./pages/RegisterPage.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PrivateRoute } from './pages/PrivateRoute';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path='/home' element={<ProfilePage />} />
      </Routes>
    </Router>

  );
}

export default App;
