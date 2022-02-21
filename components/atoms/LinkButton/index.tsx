import Link from 'next/link'

import { StyledLink, StyledButton } from './styles'

type LinkButtonProps = {
  href: string
  title: string
  className?: string
}

const LinkButton: React.FC<LinkButtonProps> = ({ href, title, className }) => {
  const isExternal = !href.startsWith('/')

  return (
    <Link href={href} passHref>
      <StyledLink target={isExternal ? '' : '_blank'}>
        <StyledButton className={className}>{title}</StyledButton>
      </StyledLink>
    </Link>
  )
}

export default LinkButton
