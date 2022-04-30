import Spacer from '../../atoms/Spacer'
import CardActions from './CardActions'
import LinkButton from '../../atoms/LinkButton'

type MyCardProps = {
  href: string
  hrefTitle: string
  title: string
  description: string
  actionProps?: any
}

const MyCard: React.FC<MyCardProps> = ({
  href,
  hrefTitle,
  title,
  description,
  actionProps = { alignRight: true }
}) => (
  <div className='flex flex-col border-2 border-sky-800 rounded-2xl box-border p-5 bg-slate-900'>
    <div className='flex flex-col mb-2'>
      <div className='flex items-center justify-center mb-4 text-2xl text-sky-400 tracking-[0.00735em] underline'>
        {title}
      </div>

      <div className='text-sm tracking-[0.01071em]'>{description}</div>
    </div>

    <Spacer />

    <CardActions {...actionProps}>
      <LinkButton href={href} title={hrefTitle} className='mt-4' />
    </CardActions>
  </div>
)

export default MyCard
