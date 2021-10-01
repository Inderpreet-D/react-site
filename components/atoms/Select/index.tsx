import { ChangeEvent, MouseEventHandler } from 'react'
import {
  StyledContainer,
  StyledLabel,
  StyledSelect,
  StyledOptionList,
  StyledOption,
  StyledBackdrop
} from './styles'

type OnClickType = MouseEventHandler<HTMLDivElement>
type OnOptClickType = (opt: string) => OnClickType

type SelectProps = React.FC<
  React.SelectHTMLAttributes<HTMLSelectElement> & {
    label: string
    options: string[]
  }
>

const Select: SelectProps = ({
  label,
  options,
  value,
  onChange,
  className
}) => {
  const [open, setOpen] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const backdropRef = React.useRef<HTMLDivElement>(null)

  const toggleOpen = React.useCallback((e: MouseEvent) => {
    e.preventDefault()
    setOpen(old => !old)
  }, [])

  const handleContainerClick = React.useCallback<OnClickType>(
    e => {
      if (e.target === containerRef.current) {
        toggleOpen((e as unknown) as MouseEvent)
      }
    },
    [toggleOpen]
  )

  const handleOptionClick = React.useCallback<OnOptClickType>(
    opt => e => {
      toggleOpen((e as unknown) as MouseEvent)
      onChange &&
        onChange({ target: { value: opt } } as ChangeEvent<HTMLSelectElement>)
    },
    [toggleOpen, onChange]
  )

  const handleBackdropClick = React.useCallback<OnClickType>(
    e => {
      if (e.target === backdropRef.current) {
        toggleOpen((e as unknown) as MouseEvent)
      }
    },
    [toggleOpen]
  )

  return (
    <>
      <StyledContainer
        open={open}
        onClick={handleContainerClick}
        className={className}
        ref={containerRef}
      >
        <StyledLabel>{label}</StyledLabel>

        <StyledSelect>{value}</StyledSelect>

        {open && (
          <StyledOptionList>
            {options.map((opt, i) => (
              <StyledOption key={i} onClick={handleOptionClick(opt)}>
                {opt}
              </StyledOption>
            ))}
          </StyledOptionList>
        )}
      </StyledContainer>

      {open && (
        <StyledBackdrop onClick={handleBackdropClick} ref={backdropRef} />
      )}
    </>
  )
}

export default Select
