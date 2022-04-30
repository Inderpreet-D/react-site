import { DivProps } from 'react-html-props'
import clsx from 'clsx'

import Button from '../Button'

type SelectProps = DivProps & {
  label?: string
  labelClass?: string
  options: string[]
  value: string
  onChange: (val: string) => void
}

const Select: React.FC<SelectProps> = ({
  label,
  options,
  value,
  onChange,
  className: extraClasss,
  labelClass
}) => {
  const [open, setOpen] = React.useState(false)

  const handleSelect = React.useCallback(
    (value: string) => {
      onChange(value)
      setOpen(false)
    },
    [onChange]
  )

  const handleMainClick = React.useCallback(() => {
    setOpen(true)
  }, [])

  const handleBackdropClick = React.useCallback(() => {
    setOpen(false)
  }, [])

  return (
    <div className={clsx('flex items-center', extraClasss)}>
      {label && (
        <div className={clsx('text-white text-base mr-4', labelClass)}>
          {label}
        </div>
      )}

      <div className={'relative'}>
        <Button
          onClick={e => {
            e.stopPropagation()
            e.preventDefault()
            handleMainClick()
          }}
          className='relative'
        >
          {value}
        </Button>

        {open && (
          <>
            <div className='z-20 absolute top-12 flex flex-col border border-sky-400 rounded-xl py-2 bg-sky-800 text-white w-auto'>
              {options.map(opt => (
                <div
                  key={opt}
                  onClick={e => {
                    e.stopPropagation()
                    e.preventDefault()
                    handleSelect(opt)
                  }}
                  className={clsx(
                    'text-sm mb-1 px-3 py-1 last:mb-0 hover:text-black hover:bg-slate-400 transition-all duration-300 text-center cursor-pointer w-full whitespace-nowrap',
                    value === opt && 'bg-slate-400 text-black'
                  )}
                >
                  {opt}
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {open && (
        <div
          onClick={e => {
            e.preventDefault()
            e.stopPropagation()
            handleBackdropClick()
          }}
          className='bg-transparent z-10 absolute top-0 left-0 right-0 bottom-0'
        />
      )}
    </div>
  )
}

export default Select
