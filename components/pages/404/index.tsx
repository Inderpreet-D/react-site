import NextLink from 'next/link'

import { ErrorBox, Link } from './styles'

const Page = () => (
  <ErrorBox>
    <h1>Page Not Found</h1>

    <NextLink href='/' replace passHref>
      <Link>Go back home</Link>
    </NextLink>
  </ErrorBox>
)

export default Page
