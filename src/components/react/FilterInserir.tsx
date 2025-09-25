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
import { enviarProduto, type Dados } from "src/lib/utils";

interface myComponentProps {
  itemHome?: string;
}

export const FilterInserir: React.FC<myComponentProps> = ({ itemHome }) => {
  const [typeSelected, setTypeSelected] = React.useState(itemHome);
  const [typeProduct, setTypeProduct] = React.useState("");
  const [nomeProduto, setNomeProduto] = React.useState("");
  const [precoProduto, setPrecoProduto] = React.useState("");
  const [descricaoProduto, setDescricaoProduto] = React.useState("");
  const [capaProduto, setCapaProduto] = React.useState("");
  const [img1Produto, setImg1Produto] = React.useState("");
  const [img2Produto, setImg2Produto] = React.useState("");
  const [img3Produto, setImg3Produto] = React.useState("");

  function ajustarStringPreco() {
    const novoPreco = `R$ ${precoProduto.toString()},00`;
    return novoPreco;
  }

  async function saveProdutos() {
    const novoPreco = ajustarStringPreco();

    const produtos: Dados = {
      nome: nomeProduto,
      preco: novoPreco,
      categoria: typeSelected,
      subCategoria: typeProduct,
      descricao: descricaoProduto,
      imgCapa: capaProduto,
      imgProduto: [img1Produto, img2Produto, img3Produto],
    };

    await enviarProduto(produtos);
  }

  return (
    <div>
      <div className="flex justify-end mb-8 md:mb-[4rem]">
        <div className="flex flex-col items-center w-full px-[10%] gap-[1rem]">
          <form className="max-w-[600px] flex flex-col w-full gap-4 items-center mb-4">
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
                value={nomeProduto}
                onChange={(e) => setNomeProduto(e.target.value)}
              />
            </div>

            <div className="w-full flex justify-end items-end">
              <div className="flex flex-col items-end gap-[1rem] md:flex-row">
                <Select
                  defaultValue={itemHome || ""}
                  onValueChange={(value) => {
                    if (value == "callcenter") {
                      setTypeSelected("");
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
                              value={item.nome}
                            >
                              {item.title}
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
                value={precoProduto}
                onChange={(e) => setPrecoProduto(e.target.value)}
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
                value={descricaoProduto}
                onChange={(e) => setDescricaoProduto(e.target.value)}
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
                value={capaProduto}
                onChange={(e) => setCapaProduto(e.target.value)}
              />
            </div>

            <div className="input-form-container">
              <label htmlFor="img1-product-input" className="label-form">
                Imagem 1
              </label>
              <input
                className="input-search"
                type="text"
                name="img1-product-input"
                id="img1-product-input"
                placeholder="Link da imagem"
                value={img1Produto}
                onChange={(e) => setImg1Produto(e.target.value)}
              />
            </div>

            <div className="input-form-container">
              <label htmlFor="img2-product-input" className="label-form">
                Imagem 2
              </label>
              <input
                className="input-search"
                type="text"
                name="img2-product-input"
                id="img2-product-input"
                placeholder="Link da imagem"
                value={img2Produto}
                onChange={(e) => setImg2Produto(e.target.value)}
              />
            </div>

            <div className="input-form-container">
              <label htmlFor="img3-product-input" className="label-form">
                Imagem 3
              </label>
              <input
                className="input-search"
                type="text"
                name="img3-product-input"
                id="img3-product-input"
                placeholder="Link da imagem"
                value={img3Produto}
                onChange={(e) => setImg3Produto(e.target.value)}
              />
            </div>
          </form>

          <a
            onClick={saveProdutos}
            className={`bg-white border border-gray-600 text-center text-sm text-gray-800 font-[500] w-full max-w-[400px] h-fit py-4 rounded-md transition duration-300 hover:bg-black/100 hover:text-white`}
          >
            Enviar
          </a>
        </div>
      </div>
    </div>
  );
};
