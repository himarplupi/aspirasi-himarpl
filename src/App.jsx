import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Aspirasidisplay from './pages/aspirasiDisplay';
import Aspirasi from './pages/aspirasi';
import UserManagement from './pages/userManagement';
import Profile from './pages/profile';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/aspirasidisplay" element={<Aspirasidisplay />} />
          <Route path="/aspirasi" element={<Aspirasi />} />
          <Route path="/login" element={<Login />} />
          <Route path="/usermanagement" element={<UserManagement />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;