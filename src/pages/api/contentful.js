import { createClient } from "contentful";

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

export async function getProducts() {
  const data = await client.getEntries({ content_type: "dapper" });
  console.log(data);
  return data.items;
}
