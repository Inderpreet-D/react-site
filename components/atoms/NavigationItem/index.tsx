import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'

type NavigationItemProps = {
  link: string
  children: React.ReactNode
}

const className =
  'flex items-center justify-center transition-all duration-700 border-4 border-transparent box-border w-full h-full px-1 py-0 text-center hover:text-primary-light hover:border-r-primary-dark hover:border-l-primary-dark hover:bg-dark-dark lg:hover:border-transparent lg:hover:border-b-primary-dark lg:hover:bg-dark-dark lg:hover:pb-3 lg:hover:duration-200'
const className2 =
  'text-primary-light border-r-primary-dark border-l-primary-dark bg-dark-dark lg:border-transparent lg:border-b-primary-dark lg:bg-dark-dark'

const NavigationItem: React.FC<NavigationItemProps> = ({ link, children }) => {
  const { pathname } = useRouter()

  const isActive = React.useMemo(() => {
    if (link === '/') {
      return pathname === link
    }

    return pathname.startsWith(link)
  }, [pathname, link])

  return (
    <div className='w-full lg:w-fit h-[3.125rem] cursor-pointer select-none'>
      <Link href={link} passHref>
        <div className={clsx(className, isActive && className2)}>
          {children}
        </div>
      </Link>
    </div>
  )
}

export default NavigationItem
