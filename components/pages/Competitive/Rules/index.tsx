type RulesProps = {
  rules: string[]
}

type RuleType = 'BAN' | 'GENERAL'

const Rules: React.FC<RulesProps> = ({ rules }) => {
  return (
    <>
      <div>Rules</div>

      {rules.map((rule, i) => {
        const [t, text] = rule.split(':').map(s => s.trim())
        const type = t as RuleType

        return (
          <div
            key={i}
            style={{
              color:
                type === 'BAN' ? 'red' : type === 'GENERAL' ? 'green' : 'white'
            }}
          >
            {text}
          </div>
        )
      })}
    </>
  )
}

export default Rules
