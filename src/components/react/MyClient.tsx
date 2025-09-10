import { useState } from "react";

export function MyClient() {
  const [viewClient, setViewClient] = useState("none");

  return (
    <div
      className="flex w-[100%] h-[8rem] justify-center items-center bg-transparent transition-all duration-300 hover:h-[15rem]"
      onMouseEnter={() => setViewClient("flex")}
      onMouseLeave={() => setViewClient("none")}
    >
      <div
        className="flex flex-col w-fit h-fit py-4 gap-2 items-center bg-black/80 px-[2rem] rounded-2xl border border-white"
        style={{ display: viewClient }}
      >
        <h2 className="text-gray-100 text-center text-lg font-bold">
          1.000,00
        </h2>
        <p className="text-center text-sm text-gray-100">Cadeiras</p>
        <p className="text-center text-sm text-gray-300">
          Entregues e montadas
        </p>
      </div>
    </div>
  );
}
