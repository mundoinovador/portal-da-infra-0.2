import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export type IDType = string | { $oid?: string } | { [key: string]: unknown };

// INTERFACE DE TIPAGENS GLOBAIS
export interface Dados {
  nome: string;
  categoria?: string;
  subCategoria?: string;
  preco: string;
  descricao: string;
  imgCapa: string;
  imgProduto: [string, string, string | ""];
  _id?: IDType;
}

interface Categoria {
  category: string;
  itens: { title: string; nome: string }[];
}

const categorias: Array<Categoria> = [
  {
    category: "cadeiras",
    itens: [
      { title: "Preço", nome: "preco" },
      { title: "Popular", nome: "popular" },
      { title: "Cadeiras Diretor", nome: "cadeiras-diretor" },
      { title: "Cadeiras Executivo", nome: "cadeiras-executivo" },
      { title: "Cadeiras Presidente", nome: "cadeiras-presidente" },
      { title: "Cadeiras Gamer", nome: "cadeiras-gamer" },
      { title: "Cadeiras Fixo", nome: "cadeiras-fixo" },
      { title: "poltronas para recepção", nome: "poltrona-para-recepcao" },
    ],
  },
  {
    category: "mesas",
    itens: [
      { title: "Preço", nome: "preco" },
      { title: "Popular", nome: "popular" },
      { title: "Mesas retas", nome: "mesas-retas" },
      { title: "Mesas em L", nome: "mesas-em-l" },
      { title: "Mesas Plataforma", nome: "mesas-plataformas" },
      { title: "Mesas de Reunião", nome: "mesas-reuniao" },
    ],
  },
  {
    category: "armarios",
    itens: [
      { title: "Preço", nome: "preco" },
      { title: "Popular", nome: "popular" },
      { title: "Armários Altos", nome: "armarios-altos" },
      { title: "Armários baixos", nome: "armarios-baixo" },
      { title: "Armário de aço", nome: "armario-de-aco" },
      { title: "Roupeiro de aço", nome: "roupeiro-de-aco" },
    ],
  },
  {
    category: "callcenter",
    itens: [],
  },
  {
    category: "geral",
    itens: [
      { title: "Todos", nome: "todos" },
      { title: "Popular", nome: "popular" },
      { title: "Econômico", nome: "economico" },
    ],
  },
];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// REQUISIÇÕES - HTTP

export async function enviarProduto(produto: Dados) {
  const res = await fetch("/api/lista-catalogo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(produto),
  });

  if (!res.ok) return;

  const data = await res.json();
  console.log("Resultado do servidor:", data);
}

// 1) LISTAR TODOS OS PRODUTOS
export async function listarTodosProdutos(): Promise<Dados[]> {
  const res = await fetch("http://localhost:4321/api/get-produtos");
  console.log(res.ok);
  if (!res.ok) throw new Error("Erro ao buscar produtos");
  return res.json();
}

// 2) LISTAR POR CATEGORIA
export async function listarPorCategoria(categoria: string): Promise<Dados[]> {
  const produtos = await listarTodosProdutos();
  return produtos.filter((p) => p.categoria === categoria);
}

// 3) LISTAR POR SUBCATEGORIA
export async function listarPorSubCategoria(
  categoria: string,
  subCategoria: string
): Promise<Dados[]> {
  const produtos = await listarTodosProdutos();
  return produtos.filter(
    (p) => p.categoria === categoria && p.subCategoria === subCategoria
  );
}

function extractId(item: Dados): string | undefined {
  const raw = item._id;
  if (!raw) return undefined;
  if (typeof raw === "string") return raw;

  const anyRaw = raw as { $oid?: unknown; toString?: () => string };
  if (typeof anyRaw.$oid === "string") return anyRaw.$oid;
  if (typeof anyRaw.toString === "function") return anyRaw.toString();
  return undefined;
}

export async function buscarProdutoPorId(id?: string): Promise<Dados | null> {
  if (!id) return null;
  const produtos = await listarTodosProdutos();
  return produtos.find((item) => extractId(item) === id) ?? null;
}

// 4) FILTRAR PRODUTOS
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

export async function buscarProdutosPorTexto(search = "") {
  return (await listarTodosProdutos()).filter((item) =>
    item.nome.toLowerCase().includes(search.toLowerCase())
  );
}

export function getCategory(item: string): Categoria {
  return (
    categorias.find((categoria) => categoria.category === item) || {
      category: "",
      itens: [],
    }
  );
}
