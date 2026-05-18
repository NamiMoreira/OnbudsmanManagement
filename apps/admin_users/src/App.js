import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";

import Header from './components/Header';
import Footer from './components/Footer';
import Index from './pages/Index';
import Manage from './pages/Manage';
import OportunidadeMelhoria from './pages/OportunidadeMelhoria';
import Login from './pages/Login/Login';
import RecoveryPassword from './pages/RecoveryPassword';
import ProtectedRoute from './components/ProtectedRoute';

// 🔹 Layout com Header e Footer
const Layout = () => {
  return (
    <>
      <Header />
      <Footer />
    </>
  );
};

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Routes>

        {/* 🔹 Rotas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<RecoveryPassword />} />

        {/* 🔹 Rotas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>

            <Route path="/" element={<Index />} />
            <Route path="/consult" element={<Manage />} />
            <Route path="/oportunidade-melhoria" element={<OportunidadeMelhoria />} />

          </Route>
        </Route>

        {/* 🔹 fallback */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </div>
  );
}

export default App;