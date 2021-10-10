import { Check, Container } from './styles'

interface PropType extends React.ComponentPropsWithoutRef<'div'> {
  checked: boolean
  onCheck: (newVal: boolean) => void
}

const Checkbox = ({ checked, onCheck, ...props }: PropType) => (
  <Container onClick={() => onCheck(!checked)} {...props}>
    {checked && <Check />}
  </Container>
)

export default Checkbox
