import { DivProps } from 'react-html-props'
import clsx from 'clsx'

import Separator from '../Separator'

const className = 'mt-2 rounded-[50%]'

const ContainerSectionSeparator: React.FC<DivProps> = ({
  className: extraClass,
  ...props
}) => <Separator className={clsx(className, extraClass)} {...props} />

export default ContainerSectionSeparator
