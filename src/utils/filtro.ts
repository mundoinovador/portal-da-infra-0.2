interface Categoria {
  category: string;
  itens: Array<string>;
}

const categorias: Array<Categoria> = [
  {
    category: "cadeiras",
    itens: [
      "Cadeiras executivas",
      "Cadeiras diretor",
      "Cadeira presidente",
      "Cadeira gamer",
      "Cadeira fixo",
    ],
  },

  {
    category: "mesas",
    itens: ["mesas retas", "mesa em L", "mesa plataforma", "mesa de reunião"],
  },

  {
    category: "armarios",
    itens: [
      "Armários altos",
      "Armários baixos",
      "Armários de aço",
      "Roupeiro de aço",
    ],
  },

  {
    category: "callcenter",
    itens: [],
  },
];

export function getCategory(item: string): object | any {
  return categorias.find((categoria) => categoria.category === item);
}
