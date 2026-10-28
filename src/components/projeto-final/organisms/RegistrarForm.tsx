import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { CadastroUsuario } from "../../../types/usuario";
import { useAuth } from "../../../contexts/AuthContext";
import Button from "../atoms/Button";
import FormField from "../molecules/FormField";

export default function RegistrarForm() {
  const { registrar } = useAuth();
  const navigate = useNavigate();
  const [dados, setDados] = useState<CadastroUsuario>({ nome: "", email: "", senha: "" });
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErro("");
    setEnviando(true);
    try {
      await registrar(dados);
      navigate("/", { replace: true });
    } catch (error) {
      setErro(error instanceof Error ? error.message : "Não foi possível criar a conta.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <form className="stack-form" onSubmit={handleSubmit}>
      <FormField label="Nome completo" name="nome" autoComplete="name" required value={dados.nome} onChange={(event) => setDados({ ...dados, nome: event.target.value })} />
      <FormField label="E-mail" name="email" type="email" autoComplete="email" required value={dados.email} onChange={(event) => setDados({ ...dados, email: event.target.value })} />
      <FormField label="Senha" name="senha" type="password" autoComplete="new-password" required minLength={6} value={dados.senha} onChange={(event) => setDados({ ...dados, senha: event.target.value })} />
      {erro && <p className="notice notice--error" role="alert">{erro}</p>}
      <Button type="submit" disabled={enviando}>{enviando ? "Criando conta..." : "Criar conta"}</Button>
      <p className="form-footnote">Já tem uma conta? <Link to="/login">Faça login</Link></p>
    </form>
  );
}
