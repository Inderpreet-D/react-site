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
    <div className='border border-slate-900 rounded-xl px-4 py-2 bg-slate-800 text-slate-400'>
      <div className='mb-2'>{label}</div>

      <div>
        {value} {name}
        {value === 1 ? '' : 's'}
      </div>
    </div>
  )
}

export default TT
