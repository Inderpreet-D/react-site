type ChangeHandler = (prop: string) => (val: string) => void

export type FormProps = {
  onChange: ChangeHandler
}
