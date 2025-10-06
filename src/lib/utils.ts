import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export type IDType = string | { $oid?: string } | { [key: string]: unknown };

export interface Dados {
  nome: string;
  categoria?: string;
  subCategoria?: string;
  preco: string;
  descricao: string;
  imgCapa: string;
  imgProduto: string[]; // Alterado para string[] para maior flexibilidade
  _id?: IDType;
}

interface Categoria {
  category: string;
  itens: { title: string; nome: string }[];
}

// Use a mesma variável para ambos os ambientes
const API_URL = import.meta.env.PUBLIC_API_URL;

const categorias: Array<Categoria> = [
  // ... (mantém as categorias existentes)
];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function enviarProduto(produto: Dados) {
  const API_URL = import.meta.env.PUBLIC_API_URL || "http://localhost:4321";
  const res = await fetch(`${API_URL}/api/lista-catalogo`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(produto),
  });
  if (!res.ok) throw new Error("Erro ao enviar produto");
  return res.json();
}

// 1) LISTAR TODOS OS PRODUTOS
export async function listarTodosProdutos(): Promise<Dados[]> {
  const res = await fetch(`${API_URL}/api/get-produtos`);
  if (!res.ok) {
    console.error("Erro ao buscar produtos:", res.statusText);
    return [];
  }
  return res.json();
}

// 2) LISTAR POR CATEGORIA (sem alterações)
export async function listarPorCategoria(categoria: string): Promise<Dados[]> {
  const produtos = await listarTodosProdutos();
  return produtos.filter((p) => p.categoria === categoria);
}

// 3) LISTAR POR SUBCATEGORIA (sem alterações)
export async function listarPorSubCategoria(
  categoria: string,
  subCategoria: string
): Promise<Dados[]> {
  const produtos = await listarTodosProdutos();
  return produtos.filter(
    (p) => p.categoria === categoria && p.subCategoria === subCategoria
  );
}

// Função auxiliar para extrair ID (sem alterações)
function extractId(item: Dados): string | undefined {
  const raw = item._id;
  if (!raw) return undefined;
  if (typeof raw === "string") return raw;
  const anyRaw = raw as { $oid?: unknown; toString?: () => string };
  if (typeof anyRaw.$oid === "string") return anyRaw.$oid;
  if (typeof anyRaw.toString === "function") return anyRaw.toString();
  return undefined;
}

// 4) BUSCAR PRODUTO POR ID
export async function buscarProdutoPorId(id?: string): Promise<Dados | null> {
  if (!id) return null;
  try {
    const produtos = await listarTodosProdutos();
    return produtos.find((item) => extractId(item) === id) ?? null;
  } catch (error) {
    console.error("Erro ao buscar produto por ID:", error);
    return null;
  }
}

// 5) LISTAR POR FILTRO (sem alterações)
export async function listarPorFiltro(filtros: {
  title?: string;
}): Promise<Dados[]> {
  const produtos = await listarTodosProdutos();
  return produtos.filter((p) => {
    let ok = true;
    if (filtros.title) {
      ok = ok && p.nome.toLowerCase().includes(filtros.title.toLowerCase());
    }
    return ok;
  });
}

// 6) BUSCAR PRODUTOS POR TEXTO (sem alterações)
export async function buscarProdutosPorTexto(search = "") {
  return (await listarTodosProdutos()).filter((item) =>
    item.nome.toLowerCase().includes(search.toLowerCase())
  );
}

// 7) GET CATEGORY (sem alterações)
export function getCategory(item: string): Categoria {
  return (
    categorias.find((categoria) => categoria.category === item) || {
      category: "",
      itens: [],
    }
  );
}
