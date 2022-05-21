import { DivProps } from 'react-html-props'
import clsx from 'clsx'

type LoadingIconProps = DivProps & {
  innerClass?: string
}

const className = 'flex items-center justify-center p-5'

const LoadingIcon: React.FC<LoadingIconProps> = ({
  className: extraClass,
  innerClass,
  ...props
}) => (
  <div className={clsx(className, extraClass)} {...props}>
    <div
      className={clsx(
        'flex items-center justify-center border-[1rem] rounded-[50%] box-border w-20 h-20 loading-icon',
        innerClass
      )}
    />
  </div>
)

export default LoadingIcon
