import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";

import { FormProduct } from "./FormProduct";
import { CardProduct } from "./CardProduct";

import { type Dados, getCategory, listarTodosProdutos } from "src/lib/utils";

interface myComponentProps {
  itemHome: string;
}

export const SelectFilter: React.FC<myComponentProps> = ({ itemHome }) => {
  const [typeSelected, setTypeSelected] = React.useState(itemHome);
  const [typeProduct, setTypeProduct] = React.useState("");

  const [getCategoryValue, setGetCategoryValue] = React.useState(
    getCategory(typeSelected)
  );

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
          <FormProduct />

          <div className="w-full flex justify-end items-end">
            <div className="flex flex-col items-end gap-[1rem] md:flex-row">
              <Select
                defaultValue={itemHome || ""}
                onValueChange={(value) => {
                  /* Atualiza a várivel da categoria selecionada */
                  setTypeSelected(value);

                  /* Trás o documento atualizado das sub categorias */
                  const newGetCategory = getCategory(typeSelected);
                  setGetCategoryValue(newGetCategory);
                }}
              >
                <SelectTrigger className="w-[200px] cursor-pointer border border-gray-400">
                  <SelectValue placeholder="Escolha uma categoria" />
                </SelectTrigger>

                <SelectContent className="border border-gray-400">
                  <SelectGroup>
                    <SelectItem className="cursor-pointer" value="callcenter">
                      Espaço call center
                    </SelectItem>

                    <SelectItem className="cursor-pointer" value="cadeiras">
                      Cadeiras
                    </SelectItem>

                    <SelectItem className="cursor-pointer" value="mesas">
                      Mesas
                    </SelectItem>

                    <SelectItem className="cursor-pointer" value="armarios">
                      Armários
                    </SelectItem>

                    <SelectItem className="cursor-pointer" value="geral">
                      Geral
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              {
                /* Se a categoria existe e
              se a categoria é diferente de call center */
                typeSelected && typeSelected != "callcenter" ? (
                  <Select
                    onValueChange={(value) => {
                      setTypeProduct(value);
                    }}
                  >
                    <SelectTrigger className="w-[180px] cursor-pointer border border-gray-400">
                      <SelectValue placeholder="Escolha o produto" />
                    </SelectTrigger>

                    <SelectContent className="border border-gray-400">
                      <SelectGroup>
                        {getCategory(typeSelected).itens.map(
                          (item: any, index: number) => (
                            <div onClick={() => alert("Foi")}>
                              <SelectItem
                                key={index}
                                className="cursor-pointer"
                                value={item.nome}
                              >
                                {item.title}
                              </SelectItem>
                            </div>
                          )
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                ) : (
                  <div></div>
                )
              }
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center px-[10%] w-fit md:px-[8%]">
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
