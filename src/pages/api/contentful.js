import { createClient } from "contentful";

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

export async function getProducts(category, sortOrder = "asc", gender) {
  let query = { content_type: "dapper" };

  if (category) {
    query["fields.category"] = category;
  }

  if (gender) {
    query["fields.gender"] = gender;
  }

  if (sortOrder === "asc") {
    query.order = "fields.price";
  } else if (sortOrder === "desc") {
    query.order = "-fields.price";
  }

  const data = await client.getEntries(query);
  return data.items;
}

export async function getProduct(sysID) {

  const product = await client.getEntry(sysID);
  return product;
}
export async function getCategories() {
  const data = await client.getEntries({ content_type: "category" });
  return data.items.map((item) => item.fields.name);
}