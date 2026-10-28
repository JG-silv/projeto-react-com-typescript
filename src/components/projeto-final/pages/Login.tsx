import { Navigate } from "react-router-dom";
import PageLayout from "../templates/PageLayout";
import LoginForm from "../organisms/LoginForm";
import { useAuth } from "../../../contexts/AuthContext";

export default function Login() {
  const { usuario, erroRestauracao } = useAuth();
  if (usuario) return <Navigate to="/" replace />;
  return (
    <PageLayout>
      <section className="auth-card">
        <p className="eyebrow">BEM-VINDO DE VOLTA</p>
        <h1>Acesse sua conta</h1>
        <p className="auth-description">Entre para continuar sua experiência na Nova Store.</p>
        {erroRestauracao && <p className="notice notice--error" role="alert">{erroRestauracao}</p>}
        <LoginForm />
      </section>
    </PageLayout>
  );
}
