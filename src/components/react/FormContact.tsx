function FormContact() {
  return (
    <form className="flex flex-col w-full gap-4 max-w-[450px] items-center">
      <div className="input-form-container">
        <label htmlFor="nome" className="label-form">
          Nome completo
        </label>
        <input
          className="input-form"
          type="text"
          name="nome"
          id="nome"
          placeholder="Digite seu nome"
        />
      </div>

      <div className="input-form-container">
        <label htmlFor="email" className="label-form">
          E-mail
        </label>
        <input
          className="input-form"
          type="email"
          name="email"
          id="email"
          placeholder="Digite seu e-mail"
        />
      </div>

      <div className="input-form-container mb-8">
        <label htmlFor="whatsapp" className="label-form">
          Whatsapp
        </label>
        <input
          className="input-form"
          type="tel"
          name="whatsapp"
          id="whatsapp"
          placeholder="Digite seu número"
        />
      </div>

      <div className="flex justify-center gap-8 mb-8">
        <a
          href="https://www.instagram.com/portaldainfra/"
          target="_blank"
          className="transition-transform hover:scale-[1.1]"
        >
          <img src={"public/instagram.png"} alt="Logo instagram" />
        </a>

        <a
          href="https://www.facebook.com/portaldainfra/"
          target="_blank"
          className="transition-transform hover:scale-[1.1]"
        >
          <img src={"public/facebook.png"} alt="Logo Facebook" />
        </a>

        <a href="#" className="transition-transform hover:scale-[1.1]">
          <img src={"public/whatsapp.png"} alt="Logo Whatsapp" />
        </a>
      </div>

      <input
        type="submit"
        value="Enviar"
        className="w-[80%] text-gray-600 border border-gray-400 py-3 font-semibold rounded-md transition-colors duration-300 hover:bg-black hover:text-white cursor-pointer mb-10"
      />
    </form>
  );
}

export { FormContact };
