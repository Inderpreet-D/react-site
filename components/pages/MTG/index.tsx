import Container from '../../atoms/Container'
import ContainerTitle from '../../atoms/ContainerTitle'
import Tooltip from '../../atoms/Tooltip'
import LinkButton from '../../atoms/LinkButton'

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
      'Helper for converting MTG decklists to be usable with Tabletop Simulator'
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

      <div className='mb-8 text-2xl'>
        This page has links to everything concerning Magic the Gathering on this
        site
      </div>

      <div className='flex flex-col justify-center w-fit'>
        {buttonData.map(({ href, title, description }, i) => (
          <Tooltip key={href} content={description}>
            <LinkButton
              href={`/mtg/${href}`}
              title={title}
              className={`!mb-${i === buttonData.length - 1 ? 0 : 6}`}
            />
          </Tooltip>
        ))}
      </div>
    </Container>
  )
}

export default Page
