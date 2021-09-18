import React from 'react'

type PropType = {
  checked: boolean
  children: React.ReactNode
  onCheck: () => void
}

const ListItem = ({ checked, children, onCheck, ...props }: PropType) => {
  return (
    <div {...props}>
      <input
        type='checkbox'
        checked={checked}
        style={{ marginRight: '0.75rem' }}
        onClick={onCheck}
      />

      <span
        onClick={onCheck}
        style={{
          cursor: 'pointer',
          textDecoration: checked ? 'line-through' : 'none',
          color: checked ? 'gray' : 'white',
          transition: 'all 750ms'
        }}
      >
        {children}
      </span>
    </div>
  )
}

export default ListItem
