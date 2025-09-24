import type { APIRoute } from "astro";
import { MongoClient, ServerApiVersion } from "mongodb";

// Aqui você vai importar sua função externa que retorna a lista
// Exemplo: import { getProdutos } from 'src/lib/produtos';
const uri = import.meta.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

interface Catalogo {
  nome: string;
  categoria: string;
  subCategoria: string;
  preco: string;
  descricao: string;
  imgCapa: string;
  imgProduto: string[];
}

async function run({
  nome,
  categoria,
  subCategoria,
  preco,
  descricao,
  imgCapa,
  imgProduto,
}: Catalogo) {
  try {
    // Send a ping to confirm a successful connection
    await client.db("catalogo_db").command({ ping: 2 });

    const myDB = client.db("catalogo_db");
    const myColl = myDB.collection("produtos");

    const doc: Catalogo = {
      nome: "Neapolitan pizza",
      categoria: "round",
      subCategoria: "",
      preco: "",
      descricao: "",
      imgCapa: "",
      imgProduto: [""],
    };

    const result = await myColl.insertOne(doc);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

interface Dados {
  nome: string;
  categoria: string;
  subCategoria: string;
  preco: string;
  descricao: string;
  imgCapa: string;
  imgProduto: [string, string];
}

export const post: APIRoute = async ({ request }) => {
  try {
    const dados: Dados = await request.json();

    const result = await run({
      nome: dados.nome,
      categoria: dados.categoria,
      subCategoria: dados.subCategoria,
      preco: dados.preco,
      descricao: dados.descricao,
      imgCapa: dados.imgCapa,
      imgProduto: [dados.imgProduto[0], dados.imgProduto[1]],
    }).catch(console.dir);

    // Retorna o resultado em JSON
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
