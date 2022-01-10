import { NextApiRequest, NextApiResponse } from 'next'
import { remark } from 'remark'
import html from 'remark-html'

type ReqType = {
  md: string
}

const api = async (req: NextApiRequest, res: NextApiResponse) => {
  const { md: markdown } = req.query as ReqType

  const result = await remark()
    .use(html, { sanitize: true })
    .process(markdown)
  const asString = result.toString()
  const targetFixed = asString.replace(/<a /g, '<a target="_blank" ')

  res.send(targetFixed)
}

export default api
