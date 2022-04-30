import NavigationItem from '../NavigationItem'
import Sidebar from '../Sidebar'
import routes from '../../../utilities/routes'

const HEADER_ITEMS = Object.entries(routes).map(([key, link], i) => (
  <NavigationItem key={i} link={link}>
    {key}
  </NavigationItem>
))

const className = 'flex border-b border-b-slate-400 box-border bg-slate-800'

const Header = () => {
  return (
    <div className={className}>
      <div className='hidden overflow-auto lg:flex'>{HEADER_ITEMS}</div>

      <div className='flex lg:hidden'>
        <Sidebar>{HEADER_ITEMS}</Sidebar>
      </div>
    </div>
  )
}

export default Header
