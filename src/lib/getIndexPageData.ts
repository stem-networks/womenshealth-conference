import { promises as fs } from "fs";
import path from "path";

export async function getIndexPageData() {
  const filePath = path.join(process.cwd(), "data_source", "index_page.json");
  const jsonData = await fs.readFile(filePath, "utf-8");
  return JSON.parse(jsonData);
}
