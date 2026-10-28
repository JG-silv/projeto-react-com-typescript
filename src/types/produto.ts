export interface Produto {
  id: string;
  nome: string;
  preco: number;
  descricao: string;
  categoria: string;
  imagem: string;
}

export type ProdutoInput = Omit<Produto, "id">;

export enum CriterioOrdenacao {
  Nome = "nome",
  MenorPreco = "menor-preco",
  MaiorPreco = "maior-preco",
}

export type EstadoRequisicao<T> =
  | { status: "carregando" }
  | { status: "erro"; mensagem: string }
  | { status: "sucesso"; dados: T };
