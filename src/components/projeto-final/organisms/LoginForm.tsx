import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { Credenciais } from "../../../types/usuario";
import { useAuth } from "../../../contexts/AuthContext";
import Button from "../atoms/Button";
import FormField from "../molecules/FormField";

export default function LoginForm() {
  const { entrar } = useAuth();
  const navigate = useNavigate();
  const [dados, setDados] = useState<Credenciais>({ email: "", senha: "" });
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErro("");
    setEnviando(true);
    try {
      await entrar(dados);
      navigate("/", { replace: true });
    } catch (error) {
      setErro(error instanceof Error ? error.message : "Não foi possível entrar.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <form className="stack-form" onSubmit={handleSubmit}>
      <FormField label="E-mail" name="email" type="email" autoComplete="email" required value={dados.email} onChange={(event) => setDados({ ...dados, email: event.target.value })} />
      <FormField label="Senha" name="senha" type="password" autoComplete="current-password" required minLength={6} value={dados.senha} onChange={(event) => setDados({ ...dados, senha: event.target.value })} />
      {erro && <p className="notice notice--error" role="alert">{erro}</p>}
      <Button type="submit" disabled={enviando}>{enviando ? "Entrando..." : "Entrar na conta"}</Button>
      <p className="form-footnote">Ainda não tem uma conta? <Link to="/registrar">Cadastre-se</Link></p>
    </form>
  );
}
