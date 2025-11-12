import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export const outputFolder = "./dicts";
export const folderPath = path.resolve(
  process.cwd(),
  `./pages/api/words/${outputFolder}`
);

export const getFileList = () => {
  const files = fs.readdirSync(folderPath) as string[];

  const names = files.map((f) => +f.split(".")[0]);

  const sorted = names.sort((a, b) => a - b);

  return sorted;
};

const api = async (_: NextApiRequest, res: NextApiResponse) => {
  res.send(getFileList());
};

export default api;
