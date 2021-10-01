import Link from 'next/link'

import { StyledErrorBox, StyledLink } from './styles'

const Page = () => (
  <StyledErrorBox>
    <h1>Page Not Found</h1>

    <Link href='/' replace passHref>
      <StyledLink>Go back home</StyledLink>
    </Link>
  </StyledErrorBox>
)

export default Page
