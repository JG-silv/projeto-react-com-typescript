import { useState, type FormEvent } from "react";
import type { Produto, ProdutoInput } from "../../../types/produto";
import Button from "../atoms/Button";
import FormField from "../molecules/FormField";

interface ProductFormProps {
  produto?: Produto;
  enviando: boolean;
  erro: string;
  aoSalvar: (dados: ProdutoInput) => Promise<void>;
}

export default function ProductForm({ produto, enviando, erro, aoSalvar }: ProductFormProps) {
  const [dados, setDados] = useState<ProdutoInput>({
    nome: produto?.nome ?? "",
    preco: produto?.preco ?? 0,
    descricao: produto?.descricao ?? "",
    categoria: produto?.categoria ?? "",
    imagem: produto?.imagem ?? "",
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await aoSalvar({ ...dados, preco: Number(dados.preco) });
  };

  return (
    <form className="stack-form" onSubmit={handleSubmit}>
      <FormField label="Nome do produto" name="nome" required maxLength={100} value={dados.nome} onChange={(event) => setDados({ ...dados, nome: event.target.value })} />
      <FormField label="Preço (R$)" name="preco" type="number" min="0.01" step="0.01" required value={dados.preco} onChange={(event) => setDados({ ...dados, preco: Number(event.target.value) })} />
      <FormField label="Categoria" name="categoria" maxLength={60} value={dados.categoria} onChange={(event) => setDados({ ...dados, categoria: event.target.value })} />
      <FormField label="URL da imagem" name="imagem" type="url" value={dados.imagem} onChange={(event) => setDados({ ...dados, imagem: event.target.value })} />
      <div className="form-field">
        <label className="label" htmlFor="descricao">Descrição</label>
        <textarea id="descricao" className="input textarea" rows={4} maxLength={500} value={dados.descricao} onChange={(event) => setDados({ ...dados, descricao: event.target.value })} />
      </div>
      {erro && <p className="notice notice--error" role="alert">{erro}</p>}
      <Button type="submit" disabled={enviando || !dados.nome.trim() || dados.preco <= 0}>{enviando ? "Salvando..." : produto ? "Salvar alterações" : "Cadastrar produto"}</Button>
    </form>
  );
}
