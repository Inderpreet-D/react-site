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
    <header className={className}>
      <nav className='hidden overflow-auto lg:flex'>{HEADER_ITEMS}</nav>

      <div className='flex lg:hidden'>
        <Sidebar>{HEADER_ITEMS}</Sidebar>
      </div>
    </header>
  )
}

export default Header
