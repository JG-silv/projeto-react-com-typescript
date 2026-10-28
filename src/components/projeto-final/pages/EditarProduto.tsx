import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import Button from "../atoms/Button";
import ProductForm from "../organisms/ProductForm";
import PageLayout from "../templates/PageLayout";
import { useAuth } from "../../../contexts/AuthContext";
import { api } from "../../../services/api";
import type { Produto, ProdutoInput } from "../../../types/produto";

export default function EditarProduto() {
  const { id } = useParams<{ id: string }>();
  const { usuario, token } = useAuth();
  const navigate = useNavigate();
  const [produto, setProduto] = useState<Produto | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (!id) {
      setErro("Identificador do produto inválido.");
      setCarregando(false);
      return;
    }
    api.getProduct(id).then(setProduto).catch((error: unknown) => {
      setErro(error instanceof Error ? error.message : "Não foi possível carregar o produto.");
    }).finally(() => setCarregando(false));
  }, [id]);

  if (usuario?.role !== "admin" || !token) return <Navigate to="/" replace />;

  const handleSave = async (data: ProdutoInput) => {
    if (!id) return;
    setErro("");
    setEnviando(true);
    try {
      await api.updateProduct(id, data, token);
      navigate("/", { replace: true });
    } catch (error) {
      setErro(error instanceof Error ? error.message : "Não foi possível salvar as alterações.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <PageLayout eyebrow="CATÁLOGO" title="Editar produto" description="Atualize as informações do produto." actions={<Link to="/"><Button variant="secondary" type="button">Voltar</Button></Link>}>
      <section className="editor-card">
        {carregando && <div className="loading-state" role="status"><span className="spinner" />Carregando produto...</div>}
        {!carregando && produto && <ProductForm key={produto.id} produto={produto} enviando={enviando} erro={erro} aoSalvar={handleSave} />}
        {!carregando && !produto && <p className="notice notice--error" role="alert">{erro}</p>}
      </section>
    </PageLayout>
  );
}
