interface Categoria {
  category: string;
  itens: Array<object>;
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

export function getCategory(item: string): object | any {
  console.log(categorias.find((categoria) => categoria.category === item));
  return categorias.find((categoria) => categoria.category === item);
}
