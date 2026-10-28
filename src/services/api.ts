import type { CadastroUsuario, Credenciais, RespostaAutenticacao, Usuario } from "../types/usuario";
import type { Produto, ProdutoInput } from "../types/produto";

const API_URL = import.meta.env.VITE_API_URL ?? "https://projeto-node-step-t5i1.vercel.app";

async function request<T>(path: string, init: RequestInit = {}, token?: string): Promise<T> {
  const headers = new Headers(init.headers);
  if (init.body) headers.set("Content-Type", "application/json");
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const response = await fetch(`${API_URL}${path}`, { ...init, headers });
  if (!response.ok) {
    let message = `A solicitação falhou (${response.status}).`;
    try {
      const body = (await response.json()) as { erro?: string; mensagem?: string };
      message = body.erro ?? body.mensagem ?? message;
    } catch {
      // Respostas sem JSON usam a mensagem HTTP acima.
    }
    throw new Error(message);
  }
  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
}

interface ApiProduto extends Omit<Produto, "id"> {
  _id: string;
  id?: string;
}

function normalizeProduct(product: ApiProduto): Produto {
  return {
    id: product.id ?? product._id,
    nome: product.nome,
    preco: product.preco,
    descricao: product.descricao ?? "",
    categoria: product.categoria ?? "",
    imagem: product.imagem ?? "",
  };
}

export const api = {
  async login(credentials: Credenciais): Promise<RespostaAutenticacao> {
    return request<RespostaAutenticacao>("/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },
  async register(data: CadastroUsuario): Promise<RespostaAutenticacao> {
    return request<RespostaAutenticacao>("/registrar", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  async getProfile(token: string): Promise<{ usuario: Usuario }> {
    return request<{ usuario: Usuario }>("/me", {}, token);
  },
  async listProducts(): Promise<Produto[]> {
    const products = await request<ApiProduto[]>("/produtos");
    return products.map(normalizeProduct);
  },
  async getProduct(id: string): Promise<Produto> {
    const product = await request<ApiProduto>(`/produtos/${encodeURIComponent(id)}`);
    return normalizeProduct(product);
  },
  async createProduct(data: ProdutoInput, token: string): Promise<Produto> {
    const product = await request<ApiProduto>("/produtos", {
      method: "POST",
      body: JSON.stringify(data),
    }, token);
    return normalizeProduct(product);
  },
  async updateProduct(id: string, data: ProdutoInput, token: string): Promise<Produto> {
    const product = await request<ApiProduto>(`/produtos/${encodeURIComponent(id)}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }, token);
    return normalizeProduct(product);
  },
  async deleteProduct(id: string, token: string): Promise<void> {
    await request<{ mensagem: string }>(`/produtos/${encodeURIComponent(id)}`, {
      method: "DELETE",
    }, token);
  },
};
