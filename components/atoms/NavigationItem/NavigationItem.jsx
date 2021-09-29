import Link from 'next/link'
import { useRouter } from 'next/router'

import { StyledHolder, StyledLink } from './NavigationItem.styles'

const NavigationItem = ({ link, children }) => {
  const { pathname } = useRouter()
  const activeClass = pathname === link ? 'active' : ''

  return (
    <StyledHolder>
      <Link href={link} passHref>
        <StyledLink className={activeClass}>{children}</StyledLink>
      </Link>
    </StyledHolder>
  )
}

export default NavigationItem
