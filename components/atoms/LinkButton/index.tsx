import Link from 'next/link'

import StyledLink from './styles'
import Button from '../Button'

type LinkButtonProps = {
  href: string
  title: string
}

const LinkButton: React.FC<LinkButtonProps> = ({ href, title }) => (
  <Button>
    <Link href={href} passHref>
      <StyledLink target={href.startsWith('/') ? '' : '_blank'}>
        {title}
      </StyledLink>
    </Link>
  </Button>
)

export default LinkButton
