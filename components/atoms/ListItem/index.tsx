import React from 'react'

import { Checkbox, Item, Text } from './styles'

interface PropType extends React.ComponentPropsWithoutRef<'div'> {
  checked: boolean
  onCheck: () => void
}

const ListItem = ({ checked, children, onCheck, className }: PropType) => {
  return (
    <Item className={className}>
      <Checkbox checked={checked} onCheck={onCheck} />

      <Text onClick={onCheck} checked={checked}>
        {children}
      </Text>
    </Item>
  )
}

export default ListItem
