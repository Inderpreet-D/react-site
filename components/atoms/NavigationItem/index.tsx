import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'

type NavigationItemProps = {
  link: string
}

const className =
  'flex items-center justify-center transition-all duration-700 border-4 border-transparent box-border w-full h-full px-1 py-0 text-center hover:text-sky-500 active:text-sky-500 hover:border-r-sky-800 active:border-r-sky-800 hover:border-l-sky-800 active:border-l-sky-800 hover:bg-slate-700 active:bg-slate-700 lg:hover:border-transparent lg:hover:border-b-sky-800 lg:active:border-b-sky-800 lg:hover:bg-slate-900 lg:active:bg-slate-900 lg:hover:pb-3 lg:hover:duration-200'
const className2 =
  'text-sky-500 border-r-sky-800 border-l-sky-800 bg-slate-700 lg:border-transparent lg:border-b-sky-800 lg:bg-slate-900'

const NavigationItem: React.FC<NavigationItemProps> = ({ link, children }) => {
  const { pathname } = useRouter()

  const isActive = React.useMemo(() => {
    if (link === '/') {
      return pathname === link
    }

    return pathname.startsWith(link)
  }, [pathname, link])

  return (
    <div className='w-full h-[3.125rem] cursor-pointer select-none'>
      <Link href={link} passHref>
        <div className={clsx(className, isActive && className2)}>
          {children}
        </div>
      </Link>
    </div>
  )
}

export default NavigationItem
