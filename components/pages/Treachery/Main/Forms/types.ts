import { Values } from '../../../../../slices/treachery'

type ChangeHandler = (prop: string) => (val: string) => void

export type FormProps = {
  values: Values
  onChange: ChangeHandler
}
