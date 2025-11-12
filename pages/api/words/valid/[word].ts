import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

import { folderPath, getFileList } from "..";

const api = async (req: NextApiRequest, res: NextApiResponse) => {
  const { word } = req.query as { word: string };

  const wordLength = word.length;
  const fileList = getFileList();
  if (!fileList.includes(wordLength)) {
    res.send({ valid: false });
  }

  const words = fs.readFileSync(`${folderPath}/${wordLength}.json`).toString();
  const wordsArray = JSON.parse(words) as string[];

  res.send({ valid: wordsArray.includes(word) });
};

export default api;
