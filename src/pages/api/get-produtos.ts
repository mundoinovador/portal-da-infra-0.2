import type { APIRoute } from "astro";
import { MongoClient, ServerApiVersion } from "mongodb";

const uri = import.meta.env.MONGODB_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// FUNÇÃO PARA BUSCAR PRODUTOS NO BANCO
async function buscarProdutos() {
  await client.connect();
  const coll = client.db("catalogo_db").collection("produtos");
  const produtos = await coll.find({}).toArray();
  return produtos;
}

// API POST RECEBENDO REQUISIÇÃO
export const GET: APIRoute = async () => {
  try {
    const produtos = await buscarProdutos();

    return new Response(JSON.stringify(produtos), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);

    return new Response(JSON.stringify({ error: "Erro ao buscar produtos" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
