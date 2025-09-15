import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";

export function SelectFilter() {
  const [typeSelected, setTypeSelected] = React.useState("");

  return (
    <div className="flex flex-col gap-[1rem]">
      <Select
        onValueChange={(value) => {
          setTypeSelected(value);
        }}
      >
        <SelectTrigger className="w-[180px] cursor-pointer border border-gray-400">
          <SelectValue placeholder="Escolha um item" />
        </SelectTrigger>
        <SelectContent className="border border-gray-400">
          <SelectGroup>
            <SelectItem className="cursor-pointer" value="call-center">
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
      {typeSelected ? (
        <Select>
          <SelectTrigger className="w-[180px] cursor-pointer border border-gray-400">
            <SelectValue placeholder="Escolha um item" />
          </SelectTrigger>
          <SelectContent className="border border-gray-400">
            <SelectGroup>
              <SelectItem className="cursor-pointer" value="call-center">
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
      ) : (
        <span></span>
      )}
    </div>
  );
}
