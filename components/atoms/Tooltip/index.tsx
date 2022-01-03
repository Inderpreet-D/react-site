import Portal from '../Portal'
import { Host, Tip, Arrow } from './styles'

type TooltipProps = {
  content: React.ReactNode
  className?: string
}

const Tooltip: React.FC<TooltipProps> = ({ content, children, className }) => {
  const hostRef = React.useRef<HTMLDivElement>(null)
  const [hovering, setHovering] = React.useState(false)

  return (
    <Host
      ref={hostRef}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {hovering && (
        <Portal>
          <Tip
            box={hostRef.current?.getBoundingClientRect()}
            className={className}
          >
            {content}
          </Tip>
        </Portal>
      )}

      {children}
    </Host>
  )
}

export default Tooltip
