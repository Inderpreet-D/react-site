import { DivProps } from 'react-html-props'
import clsx from 'clsx'

type HeaderProps = DivProps & {
  title: string
  subtitle: string
}

const className = 'flex'

const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  className: extraClass,
  ...props
}) => (
  <div className={clsx(className, extraClass)} {...props}>
    <div className='flex-grow mb-2 font-bold'>{title}</div>

    <div className='italic'>{subtitle}</div>
  </div>
)

export default Header
