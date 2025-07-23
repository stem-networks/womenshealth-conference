import { promises as fs } from "fs";
import path from "path";

export async function getSessionsData() {
  const filePath = path.join(
    process.cwd(),
    "data_source",
    "sessions_data.json"
  );
  const jsonData = await fs.readFile(filePath, "utf-8");
  return JSON.parse(jsonData);
}
