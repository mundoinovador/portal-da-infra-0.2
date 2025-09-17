export function CardProduct() {
  return (
    <div className="flex flex-col w-full shadow border rounded-md md:max-w-[360px]">
      <img
        src="src/assets/categorias/call-center2.png"
        className="rounded-md w-[100%] mb-4"
      />

      <div className="flex flex-col justify-between w-full gap-6 p-4">
        <div>
          <h2 className="text-sm font-semibold mb-2">Nome do produto</h2>
          <h3 className="text-lg">R$ 100,00</h3>
        </div>

        <div className="flex w-full justify-between gap-2">
          <a
            className={`bg-white border border-gray-400 text-center text-sm text-black font-[500] w-full max-w-[400px] h-fit py-4 rounded-md transition duration-300 hover:bg-black hover:text-white`}
          >
            Ver detalhes
          </a>

          <a
            className={`bg-white border border-gray-400 text-center text-sm text-black font-[500] w-full max-w-[400px] h-fit py-4 rounded-md transition duration-300 hover:bg-black hover:text-white`}
          >
            Consultor
          </a>
        </div>
      </div>
    </div>
  );
}
