import * as React from "react";

interface Descricao {
  descricao: string;
}

export default function DescricaoProduto({ descricao }: Descricao) {
  const [expandido, setExpandido] = React.useState(false);

  const textoLimitado = descricao.length > 150 && !expandido;

  return (
    <div className="text-sm text-black/70 md:mb-[2rem]">
      <p className="inline">
        {textoLimitado ? descricao.slice(0, 150) + "..." : descricao}
        <br className="mb-1" />
      </p>
      {descricao.length > 150 && (
        <button
          onClick={() => setExpandido(!expandido)}
          className="ml-1 cursor-pointer text-black/45 hover:underline focus:outline-none"
        >
          {expandido ? "mostrar menos" : "mostrar mais"}
        </button>
      )}
    </div>
  );
}
