import { Tooltip } from './styles'

type TTProps = {
  payload?: any[]
  label?: string
  active?: boolean
}

const TT: React.FC<TTProps> = ({ payload, label, active }) => {
  if (!active) {
    return null
  }

  const { name, value } = payload![0]

  return (
    <Tooltip>
      <div>{label}</div>

      <div>
        {value} {name}
        {value === 1 ? '' : 's'}
      </div>
    </Tooltip>
  )
}

export default TT
