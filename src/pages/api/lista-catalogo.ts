import type { APIRoute } from "astro";
import type { Dados } from "src/lib/utils";
import { MongoClient, ServerApiVersion } from "mongodb";

const uri = import.meta.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// FUNÇÃO PARA INSERIR NO BANCO
async function inserirNoBanco(dados: Dados) {
  await client.connect();
  const coll = client.db("catalogo_db").collection<Dados>("produtos");
  const result = await coll.insertOne(dados);
  return result.insertedId;
}

// API POST RECEBENDO REQUISIÇÃO
export const POST: APIRoute = async ({ request }) => {
  try {
    const dados: Dados = await request.json();

    const result = await inserirNoBanco({
      nome: dados.nome,
      categoria: dados.categoria,
      subCategoria: dados.subCategoria,
      preco: dados.preco,
      descricao: dados.descricao,
      imgCapa: dados.imgCapa,
      imgProduto: [dados.imgProduto[0], dados.imgProduto[1]],
    }).catch(console.dir);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Erro ao processar dados" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
      },
    });
  }
};
