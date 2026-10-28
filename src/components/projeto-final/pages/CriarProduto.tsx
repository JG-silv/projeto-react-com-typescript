import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Button from "../atoms/Button";
import ProductForm from "../organisms/ProductForm";
import PageLayout from "../templates/PageLayout";
import { useAuth } from "../../../contexts/AuthContext";
import { api } from "../../../services/api";
import type { ProdutoInput } from "../../../types/produto";

export default function CriarProduto() {
  const { usuario, token } = useAuth();
  const navigate = useNavigate();
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);
  if (usuario?.role !== "admin" || !token) return <Navigate to="/" replace />;

  const handleSave = async (data: ProdutoInput) => {
    setErro("");
    setEnviando(true);
    try {
      await api.createProduct(data, token);
      navigate("/", { replace: true });
    } catch (error) {
      setErro(error instanceof Error ? error.message : "Não foi possível cadastrar o produto.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <PageLayout eyebrow="CATÁLOGO" title="Novo produto" description="Preencha os detalhes para adicionar um item ao catálogo." actions={<Link to="/"><Button variant="secondary" type="button">Voltar</Button></Link>}>
      <section className="editor-card"><ProductForm enviando={enviando} erro={erro} aoSalvar={handleSave} /></section>
    </PageLayout>
  );
}
