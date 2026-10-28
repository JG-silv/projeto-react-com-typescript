# Projeto Final React com TypeScript

Aplicação de catálogo com React, TypeScript, Vite e organização Atomic Design. Inclui cadastro/login, consulta de produtos, filtro com Material UI, ordenação e CRUD restrito a usuários administradores.

## Executar

```bash
npm install
npm run dev
```

Valide os tipos e gere o build de produção com:

```bash
npm run typecheck
npm run build
```

## API

Por padrão, a aplicação usa `https://projeto-node-step-t5i1.vercel.app`. Para apontar para outra instância, defina `VITE_API_URL` no ambiente antes de iniciar o Vite. São usados os endpoints `POST /registrar`, `POST /login`, `GET /me` e o CRUD em `/produtos`.

O cadastro público cria contas com papel `user`; somente contas com papel `admin` podem cadastrar, editar e excluir produtos. O token de autenticação é guardado no `localStorage` e removido ao sair.

## Organização

- `src/components/projeto-final/atoms`: Button, Input e Label.
- `src/components/projeto-final/molecules`: campos, cartão e filtro de produtos.
- `src/components/projeto-final/organisms`: cabeçalho, formulários e listagem.
- `src/components/projeto-final/templates`: layout compartilhado.
- `src/components/projeto-final/pages`: páginas da aplicação.
- `src/types`: interfaces, enums e estados discriminados.
- `src/services/api.ts`: integração tipada com a API Node.
