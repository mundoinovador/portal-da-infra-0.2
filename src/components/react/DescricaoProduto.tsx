import * as React from "react";
import { formatStringToHTML } from "src/lib/utils";

interface Descricao {
  descricao: string;
}

export default function DescricaoProduto({ descricao }: Descricao) {
  const [expandido, setExpandido] = React.useState(false);
  const textoLimitado = descricao.length > 150 && !expandido;

  // Formata a descrição para HTML
  const descricaoFormatada = formatStringToHTML(
    textoLimitado ? descricao.slice(0, 150) + "..." : descricao
  );

  return (
    <div className="text-sm text-black/70 md:mb-[2rem]">
      <div
        className="inline"
        dangerouslySetInnerHTML={{ __html: descricaoFormatada }}
      />
      {descricao.length > 150 && (
        <div className="mt-1">
          <button
            onClick={() => setExpandido(!expandido)}
            className="ml-1 cursor-pointer text-black/45 hover:underline hover:text-black/80 focus:outline-none"
          >
            {expandido ? "mostrar menos" : "mostrar mais"}
          </button>
        </div>
      )}
    </div>
  );
}
