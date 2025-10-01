import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// INTERFACE DE TIPAGENS GLOBAIS
export interface Dados {
  nome: string;
  categoria?: string;
  subCategoria?: string;
  preco: string;
  descricao: string;
  imgCapa: string;
  imgProduto: [string, string, string?];
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
  console.log("Resultado do servidor");
}

// 1) LISTAR TODOS OS PRODUTOS (sem filtro)
export async function listarTodosProdutos(): Promise<Dados[]> {
  const res = await fetch("http://localhost:4321/api/get-produtos");
  if (!res.ok) throw new Error("Erro ao buscar produtos");
  return res.json();
}

// 2) LISTAR PRODUTOS POR CATEGORIA
export async function listarPorCategoria(categoria: string): Promise<Dados[]> {
  const produtos = await listarTodosProdutos();
  return produtos.filter((p) => p.categoria === categoria);
}

// 3) LISTAR PRODUTOS POR SUBCATEGORIA (dependendo da categoria)
export async function listarPorSubCategoria(
  categoria: string,
  subCategoria: string
): Promise<Dados[]> {
  const produtos = await listarTodosProdutos();
  return produtos.filter(
    (p) => p.categoria === categoria && p.subCategoria === subCategoria
  );
}

// 4) LISTAR PRODUTOS POR OUTROS PARÂMETROS (ex.: title)
export async function listarPorFiltro(filtros: {
  title?: string;
}): Promise<Dados[]> {
  const produtos = await listarTodosProdutos();

  return produtos.filter((p) => {
    let ok = true;

    if (filtros.title) {
      ok = ok && p.nome.toLowerCase().includes(filtros.title.toLowerCase()); // adaptável
    }

    return ok;
  });
}

export function getCategory(item: string): any {
  console.log(
    "Categoria encontrada",
    item,
    categorias.find((categoria) => categoria.category === item)
  );

  return categorias.find((categoria) => categoria.category === item);
}
