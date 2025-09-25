import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";

import { getCategory } from "src/utils/filtro";
import { enviarProduto, listarProdutosBanco, type Dados } from "src/lib/utils";

interface myComponentProps {
  itemHome?: string;
}

export const FilterInserir: React.FC<myComponentProps> = ({ itemHome }) => {
  const [typeSelected, setTypeSelected] = React.useState(itemHome);
  const [typeProduct, setTypeProduct] = React.useState("");

  async function saveProdutos() {
    const produtos: Dados = {
      nome: "Cadeira Gamer",
      preco: "R$ 1.200",
      categoria: "cadeira",
      subCategoria: "gamer",
      descricao:
        "Uma cadeira muito confortavél para jogar, trabalhar ou até mesmo passar uma ótima tarde na janela",
      imgCapa:
        "https://http2.mlstatic.com/D_NQ_NP_780686-MLA86354607999_062025-O.webp",
      imgProduto: [
        "https://http2.mlstatic.com/D_NQ_NP_780686-MLA86354607999_062025-O.webp",
        "https://m.media-amazon.com/images/I/71fvceC2wvL._UF894,1000_QL80_.jpg",
      ],
    };

    await enviarProduto(produtos);
  }

  return (
    <div>
      <button onClick={saveProdutos}>Teste</button>
      <div className="flex justify-end mb-8 md:mb-[4rem]">
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

            <div className="input-form-container">
              <label htmlFor="name-product-input" className="label-form">
                Nome
              </label>
              <input
                className="input-search"
                type="text"
                name="name-product-input"
                id="name-product-input"
                placeholder="Digite seu nome"
              />
            </div>

            <div className="input-form-container">
              <label htmlFor="preco-product-input" className="label-form">
                Preço
              </label>
              <input
                className="input-search"
                type="number"
                name="preco-product-input"
                id="preco-product-input"
                placeholder="Digite o preço"
              />
            </div>

            <div className="input-form-container">
              <label htmlFor="descricao-product-input" className="label-form">
                Descrição
              </label>
              <input
                className="input-search"
                type="text"
                name="descricao-product-input"
                id="descricao-product-input"
                placeholder="Digite uma descrição"
              />
            </div>

            <div className="input-form-container">
              <label htmlFor="imgCapa-product-input" className="label-form">
                Imagem da Capa
              </label>
              <input
                className="input-search"
                type="text"
                name="imgCapa-product-input"
                id="imgCapa-product-input"
                placeholder="Link da imagem"
              />
            </div>

            <div className="input-form-container">
              <label htmlFor="name-product-input" className="label-form">
                Nome
              </label>
              <input
                className="input-search"
                type="text"
                name="name-product-input"
                id="name-product-input"
                placeholder="Digite seu nome"
              />
            </div>
          </form>

          <div className="w-full flex justify-end items-end">
            <div className="flex flex-col items-end gap-[1rem] md:flex-row">
              <Select
                defaultValue={itemHome || ""}
                onValueChange={(value) => {
                  if (value == "callcenter") {
                    setTypeProduct("");
                  }

                  setTypeSelected(value);
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
              {typeSelected && typeSelected != "callcenter" ? (
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
                          <SelectItem
                            key={index}
                            className="cursor-pointer"
                            value={item}
                          >
                            {item}
                          </SelectItem>
                        )
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
