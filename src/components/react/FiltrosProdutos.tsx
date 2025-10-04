import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";

import { CardProduct } from "./CardProduct";

import {
  type Dados,
  getCategory,
  listarPorCategoria,
  listarTodosProdutos,
} from "src/lib/utils";
import ButtonLink from "@components/ButtonLink.astro";

const FiltrosProdutos = ({
  categoriaProduto,
}: {
  categoriaProduto: string;
}) => {
  const [typeSelected, setTypeSelected] = React.useState<string>();
  const [typeProduct, setTypeProduct] = React.useState<string>();

  const [produtos, setProdutos] = React.useState<Dados[]>([]);
  const [visibleCount, setVisibleCount] = React.useState(10);
  const increment = 5;

  async function carregarProdutos(categoria: string) {
    try {
      if (categoria) {
        setTypeSelected(categoria);
        const produtosApi: Dados[] = await listarPorCategoria(categoria);
        setProdutos(produtosApi);
      } else {
        const produtosApi: Dados[] = await listarTodosProdutos();
        setProdutos(produtosApi);
      }
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  }

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + increment);
  };

  React.useEffect((): void => {
    carregarProdutos(categoriaProduto);
  }, []);

  return (
    <div className="flex flex-col w-full">
      <div className="flex w-full justify-end mb-8 md:mb-[4rem]">
        <div className="flex flex-col items-center w-full px-[10%] gap-[1rem] max-w-[800px]">
          <form className="flex flex-col w-full gap-4 items-center">
            <div className="input-form-container">
              <label htmlFor="search-product-input" className="label-form">
                Pesquisar
              </label>

              <input
                className="input-search"
                type="text"
                name="search-product-input"
                id="search-product-input"
                placeholder="Pesquise aqui"
              />
            </div>
          </form>

          <div className="w-full flex justify-end items-end">
            <div className="flex flex-col items-end gap-[1rem] md:flex-row">
              <Select
                onValueChange={(item) => {
                  carregarProdutos(item);
                }}
                value={typeSelected || ""}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Escolha uma categoria" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categorias</SelectLabel>
                    <SelectItem value="callcenter">
                      Espaço call center
                    </SelectItem>
                    <SelectItem value="cadeiras">Cadeiras</SelectItem>
                    <SelectItem value="mesas">Mesas</SelectItem>
                    <SelectItem value="armarios">Armários</SelectItem>
                    <SelectItem value="geral">Geral</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center px-[10%] w-fit md:px-[8%]">
        {/* Precisa criar uma váriavel só para mostrar o titulo e uma função que muda a váriavel toda vez que muda o titulo */}
        {typeSelected ? (
          <h2 className="w-full text-left mb-[1rem] font-semibold text-lg">
            Pesquisa{" "}
            <span className="font-normal">
              | {typeSelected} {typeProduct ? `- ${typeProduct}` : ""}
            </span>
          </h2>
        ) : (
          <span></span>
        )}

        <div className="flex flex-wrap gap-[2rem] mb-[4rem]">
          {produtos.slice(0, visibleCount).map((produto: Dados) => (
            <CardProduct
              key={produto._id}
              nome={produto.nome}
              preco={produto.preco}
              imgCapa={produto.imgCapa}
            />
          ))}
        </div>

        {visibleCount < produtos.length && (
          <button
            onClick={handleShowMore}
            className="bg-white text-black border border-black text-center cursor-pointer text-xs md:text-sm font-[500] w-full max-w-[400px] h-fit py-4 rounded-md transition-transform duration-300 hover:scale-[1.05] hover:bg-black hover:text-white mb-[4rem]"
          >
            Mostrar mais
          </button>
        )}
      </div>
    </div>
  );
};

export default FiltrosProdutos;
