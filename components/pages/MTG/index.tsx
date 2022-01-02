import { Info, ButtonArea, LinkButton } from './styles'
import Container from '../../atoms/Container'
import ContainerTitle from '../../atoms/ContainerTitle'

type ButtonData = {
  href: string
  title: string
  description: string
}

const buttonData: ButtonData[] = [
  {
    href: 'toadvillage',
    title: 'Toad Village',
    description:
      'Helper for converting MTG decklists for use with Tabletop Simulator'
  },
  {
    href: 'competitive',
    title: 'Competitive',
    description: 'Stat tracking page for Commander'
  },
  {
    href: 'treachery',
    title: 'Treachery',
    description: 'Used for assigning roles in a game of Treachery'
  }
]

const Page = () => {
  return (
    <Container>
      <ContainerTitle>MTG Hub</ContainerTitle>

      <Info>
        This page has links to everything concerning Magic the Gathering on this
        site
      </Info>

      <ButtonArea>
        {buttonData.map(({ href, title, description }) => (
          <LinkButton key={href} href={`/mtg/${href}`} title={title} />
        ))}
      </ButtonArea>
    </Container>
  )
}

export default Page
