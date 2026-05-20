import './App.css';

import { Routes, Route, Navigate, Outlet } from "react-router-dom";

import { jwtDecode } from "jwt-decode";

import Header from './components/Header';
import Footer from './components/Footer';

import Index from './pages/Index';
import Manage from './pages/Manage';
import OportunidadeMelhoria from './pages/OportunidadeMelhoria';

import Login from './pages/Login/Login';
import RecoveryPassword from './pages/RecoveryPassword';

// 🔹 Layout com Header e Footer
function Layout() {
  return (
    <>
      <Header />

      <main className="flex-fill">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

// 🔹 Proteção de rota
function ProtectedRoute({ children }) {

  const token = localStorage.getItem('@UnimedOuvidoria:token');

  // 🔹 Sem token
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {

    const decoded = jwtDecode(token);

    // 🔹 Verifica expiração
    const isExpired =
      decoded.exp * 1000 < Date.now();

    if (isExpired) {

      localStorage.removeItem('@UnimedOuvidoria:token');

      return <Navigate to="/login" replace />;
    }

    return children;

  } catch (error) {

    // 🔹 Token inválido
    localStorage.removeItem('@UnimedOuvidoria:token');

    return <Navigate to="/login" replace />;
  }
}

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">

      <Routes>

        {/* 🔹 Rotas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<RecoveryPassword />} />

        {/* 🔹 Rotas protegidas com layout */}
        <Route element={<Layout />}>

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            }
          />

          <Route
            path="/consult"
            element={
              <ProtectedRoute>
                <Manage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/oportunidade-melhoria"
            element={
              <ProtectedRoute>
                <OportunidadeMelhoria />
              </ProtectedRoute>
            }
          />

        </Route>

        {/* 🔹 fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>

    </div>
  );
}

export default App;