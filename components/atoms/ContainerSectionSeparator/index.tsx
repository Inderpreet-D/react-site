import { DivProps } from 'react-html-props'
import clsx from 'clsx'

import Separator from '../Separator'

const className = 'mt-2 rounded-circle'

const ContainerSectionSeparator: React.FC<DivProps> = ({
  className: extraClass,
  ...props
}) => <Separator className={clsx(className, extraClass)} {...props} />

export default ContainerSectionSeparator
