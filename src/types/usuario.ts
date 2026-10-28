export enum PapelUsuario {
  Usuario = "user",
  Administrador = "admin",
}

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  role: PapelUsuario;
}

export interface Credenciais {
  email: string;
  senha: string;
}

export interface CadastroUsuario extends Credenciais {
  nome: string;
}

export interface RespostaAutenticacao {
  token: string;
  usuario: Usuario;
}

export interface RespostaErro {
  erro?: string;
  mensagem?: string;
}
