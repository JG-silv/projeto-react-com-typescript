import type { Produto } from "../../../types/produto";
import ProductCard from "../molecules/ProductCard";

interface ProductListProps {
  produtos: Produto[];
  podeEditar: boolean;
  aoExcluir: (id: string) => void;
}

export default function ProductList({ produtos, podeEditar, aoExcluir }: ProductListProps) {
  if (!produtos.length) {
    return <div className="empty-state"><span>⌕</span><h2>Nenhum produto encontrado</h2><p>Tente outro nome ou remova o filtro aplicado.</p></div>;
  }
  return <div className="product-grid">{produtos.map((produto) => <ProductCard key={produto.id} produto={produto} podeEditar={podeEditar} aoExcluir={aoExcluir} />)}</div>;
}
