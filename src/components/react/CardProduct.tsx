interface parametrosCard {
  nome: string;
  preco: string;
  imgCapa: string;
  idProduct: string;
}

export function CardProduct({
  nome,
  preco,
  imgCapa,
  idProduct,
}: parametrosCard) {
  return (
    <div className="flex flex-col justify-end items-center w-full max-w-[360px] h-[70vh] shadow border rounded-md md:max-w-[360px] hover:cursor-pointer transition-transform hover:scale-[1.01]">
      <img src={imgCapa} className="rounded-md w-[55%] py-6" />

      <div
        onClick={() => window.open(`/${idProduct}`, "_self")}
        className="flex flex-col justify-between w-full gap-6 p-4"
      >
        <div>
          <h2 className="text-sm font-semibold mb-2">{nome}</h2>
          <h3 className="text-lg">{preco}</h3>
        </div>

        <div className="flex w-full justify-between gap-2">
          <a
            className={`bg-white border border-gray-400 text-center text-xs text-black font-[500] w-full max-w-[400px] h-fit py-3 rounded-md transition duration-300 hover:bg-black hover:text-white`}
          >
            Ver detalhes
          </a>

          <a
            className={`bg-white border border-gray-400 text-center text-xs text-black font-[500] w-full max-w-[400px] h-fit py-3 rounded-md transition duration-300 hover:bg-black hover:text-white`}
          >
            Consultor
          </a>
        </div>
      </div>
    </div>
  );
}
