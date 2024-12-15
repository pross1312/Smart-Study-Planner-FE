import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './pages/register';
import Home from './pages/home'
import ProtectedRoute from './component/ProtectedRoute';
import GoogleCallback from './component/GoogleCallback';
import { AuthProvider } from "./component/AuthContext";
import { CustomCalendar } from './pages/Calendar/components/CustomCalendar';
import LoginPage from './pages/login';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/google/callback" element={<GoogleCallback/>} />
          <Route path="/calendar" element={<CustomCalendar/>} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
 