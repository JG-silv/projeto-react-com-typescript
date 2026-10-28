import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../atoms/Button";
import ProductFilter from "../molecules/ProductFilter";
import ProductList from "../organisms/ProductList";
import PageLayout from "../templates/PageLayout";
import { useAuth } from "../../../contexts/AuthContext";
import { api } from "../../../services/api";
import { CriterioOrdenacao, type EstadoRequisicao, type Produto } from "../../../types/produto";

export default function Home() {
  const { usuario, token } = useAuth();
  const [estado, setEstado] = useState<EstadoRequisicao<Produto[]>>({ status: "carregando" });
  const [filtro, setFiltro] = useState("");
  const [ordenacao, setOrdenacao] = useState<CriterioOrdenacao>(CriterioOrdenacao.Nome);
  const [erroAcao, setErroAcao] = useState("");

  const carregarProdutos = async () => {
    setEstado({ status: "carregando" });
    try {
      setEstado({ status: "sucesso", dados: await api.listProducts() });
    } catch (error) {
      setEstado({ status: "erro", mensagem: error instanceof Error ? error.message : "Não foi possível carregar os produtos." });
    }
  };

  useEffect(() => { void carregarProdutos(); }, []);

  const produtos = useMemo(() => {
    if (estado.status !== "sucesso") return [];
    return estado.dados
      .filter((produto) => produto.nome.toLocaleLowerCase("pt-BR").includes(filtro.toLocaleLowerCase("pt-BR")))
      .sort((a, b) => {
        if (ordenacao === CriterioOrdenacao.MenorPreco) return a.preco - b.preco;
        if (ordenacao === CriterioOrdenacao.MaiorPreco) return b.preco - a.preco;
        return a.nome.localeCompare(b.nome, "pt-BR");
      });
  }, [estado, filtro, ordenacao]);

  const handleDelete = async (id: string) => {
    if (!token || !window.confirm("Deseja mesmo excluir este produto?")) return;
    setErroAcao("");
    try {
      await api.deleteProduct(id, token);
      setEstado((current) => current.status === "sucesso"
        ? { status: "sucesso", dados: current.dados.filter((item) => item.id !== id) }
        : current);
    } catch (error) {
      setErroAcao(error instanceof Error ? error.message : "Não foi possível excluir o produto.");
    }
  };

  const actions = usuario?.role === "admin"
    ? <Link to="/produtos/novo"><Button type="button">+ Novo produto</Button></Link>
    : undefined;

  return (
    <PageLayout eyebrow="CATÁLOGO" title="Produtos em destaque" description="Encontre seu próximo favorito entre nossos produtos." actions={actions}>
      {estado.status === "sucesso" && (
        <>
          <div className="catalog-toolbar">
            <ProductFilter produtos={estado.dados} aoFiltrar={setFiltro} />
            <label className="sort-control">Ordenar por
              <select value={ordenacao} onChange={(event) => setOrdenacao(event.target.value as CriterioOrdenacao)}>
                <option value={CriterioOrdenacao.Nome}>Nome</option>
                <option value={CriterioOrdenacao.MenorPreco}>Menor preço</option>
                <option value={CriterioOrdenacao.MaiorPreco}>Maior preço</option>
              </select>
            </label>
          </div>
          {erroAcao && <p className="notice notice--error" role="alert">{erroAcao}</p>}
          <div className="results-caption"><span>{produtos.length} {produtos.length === 1 ? "produto" : "produtos"}</span><button type="button" className="clear-filter" onClick={() => setFiltro("")}>Limpar filtro</button></div>
          <ProductList produtos={produtos} podeEditar={usuario?.role === "admin"} aoExcluir={(id) => void handleDelete(id)} />
        </>
      )}
      {estado.status === "carregando" && <div className="loading-state" role="status"><span className="spinner" />Carregando produtos...</div>}
      {estado.status === "erro" && <div className="error-panel" role="alert"><p>{estado.mensagem}</p><Button type="button" onClick={() => void carregarProdutos()}>Tentar novamente</Button></div>}
    </PageLayout>
  );
}
