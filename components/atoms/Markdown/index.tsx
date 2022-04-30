import clsx from 'clsx'

import useSWR from '../../../hooks/useSWR'

type MarkdownProps = {
  markdown: string
  className?: string
}

const Markdown: React.FC<MarkdownProps> = ({
  markdown,
  className: extraClass,
  ...props
}) => {
  const { data, isLoading } = useSWR<string>(
    `/markdown?md=${encodeURIComponent(markdown)}`
  )

  if (isLoading) {
    return null
  }

  return (
    <div
      dangerouslySetInnerHTML={{ __html: data }}
      className={clsx('markdown', extraClass)}
      {...props}
    />
  )
}

export default Markdown
