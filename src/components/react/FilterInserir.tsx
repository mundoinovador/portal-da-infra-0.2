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
import { FormInserir } from "./FormInserir";

interface myComponentProps {
  itemHome?: string;
}

export const FilterInserir: React.FC<myComponentProps> = ({ itemHome }) => {
  const [typeSelected, setTypeSelected] = React.useState(itemHome);
  const [typeProduct, setTypeProduct] = React.useState("");

  return (
    <div>
      <div className="flex justify-end mb-8 md:mb-[4rem]">
        <div className="flex flex-col items-center w-full px-[10%] gap-[1rem] max-w-[800px]">
          <FormInserir />

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
