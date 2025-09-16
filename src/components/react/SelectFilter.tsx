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

export function SelectFilter({ itemHome }: any) {
  const [typeSelected, setTypeSelected] = React.useState(itemHome);

  return (
    <div className="flex flex-col items-end gap-[1rem] md:flex-row-reverse">
      <Select
        defaultValue={itemHome || null}
        onValueChange={(value) => {
          window.open("/produtos?productSelect=" + value, "_self");
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
          </SelectGroup>
        </SelectContent>
      </Select>
      {typeSelected && typeSelected != "callcenter" ? (
        <Select>
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
  );
}
