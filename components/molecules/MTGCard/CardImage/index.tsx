import { ImgProps } from 'react-html-props'
import clsx from 'clsx'

const className =
  'mt-2 mb-1 mx-auto border border-slate-900 rounded-2xl box-border w-full transition-transform duration-300 hover:scale-125 hover:translate-y-8'

const CardImage: React.FC<ImgProps> = ({
  className: extraClass,
  alt,
  ...props
}) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img alt={alt} className={clsx(className, extraClass)} {...props} />
)

export default CardImage
