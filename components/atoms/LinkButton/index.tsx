import clsx from 'clsx'
import Link from 'next/link'

import Button from '../Button'

type LinkButtonProps = {
  href: string
  title: string
  className?: string
}

const LinkButton: React.FC<LinkButtonProps> = ({ href, title, className }) => {
  return (
    <Link href={href} passHref>
      <a className='text-white visited:text-primary-light'>
        <Button className={clsx('underline', className)}>{title}</Button>
      </a>
    </Link>
  )
}

export default LinkButton
