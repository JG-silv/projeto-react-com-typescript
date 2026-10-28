import { Navigate } from "react-router-dom";
import PageLayout from "../templates/PageLayout";
import RegistrarForm from "../organisms/RegistrarForm";
import { useAuth } from "../../../contexts/AuthContext";

export default function Registrar() {
  const { usuario } = useAuth();
  if (usuario) return <Navigate to="/" replace />;
  return (
    <PageLayout>
      <section className="auth-card">
        <p className="eyebrow">CRIE SUA CONTA</p>
        <h1>Comece por aqui</h1>
        <p className="auth-description">Cadastre-se para acompanhar e descobrir produtos.</p>
        <RegistrarForm />
      </section>
    </PageLayout>
  );
}
