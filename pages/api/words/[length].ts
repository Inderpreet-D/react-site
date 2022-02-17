import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'

import { folderPath, getFileList } from '.'
import { sample } from 'lodash'

const api = async (req: NextApiRequest, res: NextApiResponse) => {
  const { length } = req.query

  if (isNaN(+length)) {
    res.send({ word: 'invalid' })
  }

  const lengthNum = +length
  const fileList = getFileList()
  if (!fileList.includes(lengthNum)) {
    res.send({ word: 'invalid' })
  }

  const words = fs.readFileSync(`${folderPath}/${lengthNum}.json`).toString()
  const wordsArray = JSON.parse(words) as string[]
  const word = sample(wordsArray)

  res.send({ word })
}

export default api
