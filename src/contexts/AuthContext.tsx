import { createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren } from "react";
import type { CadastroUsuario, Credenciais, Usuario } from "../types/usuario";
import { api } from "../services/api";

interface AuthContextValue {
  usuario: Usuario | null;
  token: string | null;
  carregando: boolean;
  erroRestauracao: string | null;
  entrar: (credentials: Credenciais) => Promise<void>;
  registrar: (data: CadastroUsuario) => Promise<void>;
  sair: () => void;
}

const TOKEN_KEY = "projeto-final-token";
const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [carregando, setCarregando] = useState(Boolean(token));
  const [erroRestauracao, setErroRestauracao] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setCarregando(false);
      return;
    }
    let ativo = true;
    api.getProfile(token).then(({ usuario: perfil }) => {
      if (ativo) setUsuario(perfil);
    }).catch((error: unknown) => {
      if (!ativo) return;
      setErroRestauracao(error instanceof Error ? error.message : "Não foi possível restaurar a sessão.");
      localStorage.removeItem(TOKEN_KEY);
      setToken(null);
    }).finally(() => {
      if (ativo) setCarregando(false);
    });
    return () => { ativo = false; };
  }, []);

  const autenticar = (nextToken: string, nextUser: Usuario) => {
    localStorage.setItem(TOKEN_KEY, nextToken);
    setToken(nextToken);
    setUsuario(nextUser);
    setErroRestauracao(null);
  };

  const value = useMemo<AuthContextValue>(() => ({
    usuario,
    token,
    carregando,
    erroRestauracao,
    async entrar(credentials) {
      const result = await api.login(credentials);
      autenticar(result.token, result.usuario);
    },
    async registrar(data) {
      const result = await api.register(data);
      autenticar(result.token, result.usuario);
    },
    sair() {
      localStorage.removeItem(TOKEN_KEY);
      setToken(null);
      setUsuario(null);
    },
  }), [usuario, token, carregando, erroRestauracao]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve ser usado dentro de AuthProvider.");
  return context;
}
