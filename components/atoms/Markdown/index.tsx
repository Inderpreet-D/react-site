import { MD } from './styles'

import useSWR from '../../../hooks/useSWR'

type MarkdownProps = {
  markdown: string
  className?: string
}

const Markdown: React.FC<MarkdownProps> = ({ markdown, ...props }) => {
  const { data, isLoading } = useSWR<string>(
    `/markdown?md=${encodeURIComponent(markdown)}`
  )

  if (isLoading) {
    return null
  }

  return <MD dangerouslySetInnerHTML={{ __html: data }} {...props} />
}

export default Markdown
