import { useState } from "react";

export function MyClient() {
  const [viewClient, setViewClient] = useState("none");

  return (
    <div
      className="flex w-[100%] h-[100%] bg-transparent rounded-2xl justify-center items-center transition-all duration-300 hover:h-[18rem] md:hover:h-[100%] hover:bg-black/50"
      onMouseEnter={() => setViewClient("flex")}
      onMouseLeave={() => setViewClient("none")}
    >
      <div
        className="flex flex-col w-fit h-fit py-4 gap-2 items-center px-[2rem] rounded-2xl border border-white"
        style={{ display: viewClient }}
      >
        <h2 className="text-white text-center text-2xl font-extrabold">
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
