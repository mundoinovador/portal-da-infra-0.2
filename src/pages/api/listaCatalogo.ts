import type { APIRoute } from "astro";
import { MongoClient, ServerApiVersion } from "mongodb";

// VARIAVEIS GLOBAIS
const uri = import.meta.env.MONGODB_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// INTERFACE DE TIPAGEM
interface Dados {
  nome: string;
  categoria: string;
  subCategoria: string;
  preco: string;
  descricao: string;
  imgCapa: string;
  imgProduto: [string, string];
}

// FUNÇÃO DE INSERIR NO BANCO DE DADOS
async function inserirNoBanco({
  nome,
  categoria,
  subCategoria,
  preco,
  descricao,
  imgCapa,
  imgProduto,
}: Dados) {
  try {
    await client.db("catalogo_db").command({ ping: 1 });

    const myDB = client.db("catalogo_db");
    const myColl = myDB.collection("produtos");

    const doc: Dados = {
      nome,
      categoria,
      subCategoria,
      preco,
      descricao,
      imgCapa,
      imgProduto: imgProduto,
    };

    const result = await myColl.insertOne(doc);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } finally {
    await client.close();
  }
}

// API POST RECEBENDO REQUISIÇÃO
export const post: APIRoute = async ({ request }) => {
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
      headers: { "Content-Type": "application/json" },
    });
  }
};
