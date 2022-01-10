import Link from 'next/link'

import StyledLink from './styles'
import Button from '../Button'

type LinkButtonProps = {
  href: string
  title: string
  className?: string
}

const LinkButton: React.FC<LinkButtonProps> = ({ href, title, className }) => {
  const linkRef = React.useRef<HTMLAnchorElement>(null)

  return (
    <Button onClick={() => linkRef.current?.click()} className={className}>
      <Link href={href} passHref>
        <StyledLink ref={linkRef} target={href.startsWith('/') ? '' : '_blank'}>
          {title}
        </StyledLink>
      </Link>
    </Button>
  )
}

export default LinkButton
