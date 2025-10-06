interface UserData {
  nameUser: string;
  email: string;
  wpp: string;
  source: string;
}

function FormContact() {
  async function sendUserData(data: UserData) {
    try {
      const response = await fetch(
        "https://seu-projeto.onrender.com/send-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }

      const result = await response.json();
      console.log("Resposta do servidor");
      return result;
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      throw error;
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        sendUserData({
          nameUser: "Nicolas",
          email: "nicolas@email.com",
          wpp: "55999999999",
          source: "landing-page",
        });
      }}
      className="flex flex-col w-full gap-4 max-w-[450px] items-center"
    >
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
          <img src={"/instagram.png"} alt="Logo instagram" />
        </a>

        <a
          href="https://www.facebook.com/portaldainfra/"
          target="_blank"
          className="transition-transform hover:scale-[1.1]"
        >
          <img src={"/facebook.png"} alt="Logo Facebook" />
        </a>

        <a href="#" className="transition-transform hover:scale-[1.1]">
          <img src={"/whatsapp.png"} alt="Logo Whatsapp" />
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
