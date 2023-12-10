import OpenAI from "openai";
const apiKey = process.env.OPEN_API_KEY;
if (!apiKey) {
  throw Error("Open api key is not set");
}
const openai = new OpenAI({ apiKey });

export default openai;
// this is file for requesting to open ai from client

export async function getEmbedding(text: string) {
  const response = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: text,
  });
  const embedding = response.data[0].embedding;
  if (!embedding) throw Error("Error generating embedding");
  console.log(embedding);
  return embedding;
}
