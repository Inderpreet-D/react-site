import NextLink from 'next/link'

import Container from '../../atoms/Container'

const Page = () => (
  <Container className='!absolute !top-1/2 !left-1/2 flex flex-col items-center justify-center !w-max -translate-x-1/2 -translate-y-1/2'>
    <h1>Page Not Found</h1>

    <NextLink href='/' replace passHref>
      <a className='text-sky-400 hover:underline'>Go back home</a>
    </NextLink>
  </Container>
)

export default Page
