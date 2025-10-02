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

import { type Dados, getCategory, listarTodosProdutos } from "src/lib/utils";

const FiltrosProdutos = ({
  categoriaProduto,
}: {
  categoriaProduto: string;
}) => {
  const [typeSelected, setTypeSelected] = React.useState(categoriaProduto);
  const [typeProduct, setTypeProduct] = React.useState("");

  const [produtos, setProdutos] = React.useState<Dados[]>([]);

  React.useEffect((): void => {
    async function carregarProdutos() {
      try {
        const produtosApi: Dados[] = await listarTodosProdutos();
        setProdutos(produtosApi);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    }

    carregarProdutos();
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
              {/* <Select>
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
              </Select> */}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center px-[10%] w-fit md:px-[8%]">
        {/* {typeSelected ? (
          <h2 className="w-full text-left mb-[1rem] font-semibold text-lg">
            Pesquisa{" "}
            <span className="font-normal">
              | {typeSelected} {typeProduct ? `- ${typeProduct}` : ""}
            </span>
          </h2>
        ) : (
          <span></span>
        )} */}

        <div className="flex flex-wrap gap-[2rem]">
          {produtos.map((produto: Dados) => (
            <CardProduct
              nome={produto.nome}
              preco={produto.preco}
              imgCapa={produto.imgCapa}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FiltrosProdutos;
