import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

const Home = lazy(() => import("./components/projeto-final/pages/Home"));
const Login = lazy(() => import("./components/projeto-final/pages/Login"));
const Registrar = lazy(() => import("./components/projeto-final/pages/Registrar"));
const CriarProduto = lazy(() => import("./components/projeto-final/pages/CriarProduto"));
const EditarProduto = lazy(() => import("./components/projeto-final/pages/EditarProduto"));

function AppRoutes() {
  const { carregando, erroRestauracao } = useAuth();
  if (carregando) return <div className="loading-screen" role="status"><span className="spinner" />Restaurando sua sessão...</div>;
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="loading-screen" role="status"><span className="spinner" />Carregando página...</div>}>
        <Routes>
          <Route path="/" element={erroRestauracao ? <Navigate to="/login" replace /> : <Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registrar" element={<Registrar />} />
          <Route path="/produtos/novo" element={<CriarProduto />} />
          <Route path="/produtos/:id/editar" element={<EditarProduto />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default function App() {
  return <AppRoutes />;
}
