import { MongoClient, ServerApiVersion } from "mongodb";
import type { Dados } from "./utils";

const uri = import.meta.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// FUNÇÃO PARA BUSCAR PRODUTOS NO BANCO
export async function buscarProdutos() {
  console.log("Chegou");
  try {
    await client.connect();
    const coll = client.db("catalogo_db").collection("produtos");
    const produtos = await coll.find({}).toArray();
    return produtos;
  } catch {
    return [];
  }
}
