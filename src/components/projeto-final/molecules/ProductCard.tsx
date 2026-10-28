import { Link } from "react-router-dom";
import type { Produto } from "../../../types/produto";
import Button from "../atoms/Button";

interface ProductCardProps {
  produto: Produto;
  podeEditar: boolean;
  aoExcluir: (id: string) => void;
}

export default function ProductCard({ produto, podeEditar, aoExcluir }: ProductCardProps) {
  return (
    <article className="product-card">
      <div className="product-card__image">
        {produto.imagem
          ? <img src={produto.imagem} alt={produto.nome} loading="lazy" />
          : <span aria-hidden="true">✦</span>}
      </div>
      <div className="product-card__content">
        <div className="product-card__meta">
          <span className="category-tag">{produto.categoria || "Sem categoria"}</span>
          <span className="product-card__id">#{produto.id.slice(-5)}</span>
        </div>
        <h3>{produto.nome}</h3>
        <p>{produto.descricao || "Produto sem descrição cadastrada."}</p>
        <div className="product-card__footer">
          <strong>{produto.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</strong>
          {podeEditar && (
            <div className="product-card__actions">
              <Link className="text-link" to={`/produtos/${encodeURIComponent(produto.id)}/editar`}>Editar</Link>
              <Button variant="danger" type="button" onClick={() => aoExcluir(produto.id)} aria-label={`Excluir ${produto.nome}`}>Excluir</Button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
