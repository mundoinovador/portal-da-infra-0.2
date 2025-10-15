import type { APIRoute } from "astro";
import { MongoClient, ServerApiVersion } from "mongodb";

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

async function buscarProdutos() {
  try {
    const client = await getMongoClient();
    const coll = client.db("catalogo_db").collection("produtos");
    return await coll.find({}).toArray();
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    throw new Error("Falha ao buscar produtos");
  }
}

// Tratamento para requisições OPTIONS (pré-flight)
export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
};

// API GET
export const GET: APIRoute = async ({ request }) => {
  try {
    const produtos = await buscarProdutos();
    return new Response(JSON.stringify(produtos), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    console.error("Erro na API:", error);
    return new Response(
      JSON.stringify({
        error: "Erro na resposta",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
};
