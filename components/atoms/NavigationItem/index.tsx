import Link from 'next/link'
import { useRouter } from 'next/router'

import { StyledHolder, StyledLink } from './styles'

type NavigationItemProps = {
  link: string
}

const NavigationItem: React.FC<NavigationItemProps> = ({ link, children }) => {
  const { pathname } = useRouter()

  const activeClass = React.useMemo(() => {
    if (link === '/') {
      return pathname === link ? 'active' : ''
    }

    return pathname.startsWith(link) ? 'active' : ''
  }, [pathname, link])

  return (
    <StyledHolder>
      <Link href={link} passHref>
        <StyledLink className={activeClass}>{children}</StyledLink>
      </Link>
    </StyledHolder>
  )
}

export default NavigationItem
