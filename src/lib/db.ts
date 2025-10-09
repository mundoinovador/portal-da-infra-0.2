import { MongoClient, ServerApiVersion } from "mongodb";
import type { Dados } from "./utils"; // 👈 importa o tipo certo

const uri = import.meta.env.MONGODB_URI;
if (!uri) {
  throw new Error("URI do MongoDB não configurada");
}

let cachedClient: MongoClient | null = null;

async function getMongoClient() {
  if (cachedClient) return cachedClient;
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  await client.connect();
  cachedClient = client;
  return client;
}

export async function buscarProdutos(): Promise<Dados[]> {
  try {
    const client = await getMongoClient();
    const coll = client.db("catalogo_db").collection("produtos");

    const produtosDB = await coll.find({}).toArray();

    // Converter os documentos em objetos do tipo `Dados`
    const produtos: Dados[] = produtosDB.map((p: any) => ({
      nome: p.nome ?? "",
      categoria: p.categoria ?? "",
      subCategoria: p.subCategoria ?? "",
      preco: p.preco ?? "",
      descricao: p.descricao ?? "",
      imgCapa: p.imgCapa ?? "",
      imgProduto: Array.isArray(p.imgProduto) ? p.imgProduto : [],
      _id: p._id,
    }));

    return produtos;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    throw new Error("Falha ao buscar produtos");
  }
}
