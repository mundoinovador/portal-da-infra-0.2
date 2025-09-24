import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// INTERFACE DE TIPAGENS GLOBAIS
export interface Dados {
  nome: string;
  categoria: string;
  subCategoria: string;
  preco: string;
  descricao: string;
  imgCapa: string;
  imgProduto: [string, string];
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// REQUISIÇÕES - HTTP

// CRIAR PRODUTO
export async function enviarProduto(produto: Dados) {
  const res = await fetch("http://localhost:4321/api/lista-catalogo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(produto),
  });

  if (!res.ok) {
    return;
  }

  const data = await res.json();
  console.log("Resultado do servidor:", data);
}

// LISTAR PRODUTO
export async function listarProdutosBanco() {
  const res = await fetch("http://localhost:4321/api/get-produtos", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    console.error("Erro ao buscar produtos");
    return;
  }
  const produtos = await res.json();
  console.log("Produtos:", produtos[0]);
  return produtos;
}
