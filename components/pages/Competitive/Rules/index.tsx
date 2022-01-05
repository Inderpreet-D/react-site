import Markdown from '../../../atoms/Markdown'

type RulesProps = {
  rules: string[]
}

type RuleType = 'BAN' | 'GENERAL'

const TYPE_SEPARATOR = '::'

const Rules: React.FC<RulesProps> = ({ rules }) => {
  return (
    <>
      <div>Rules</div>

      {rules.map((rule, i) => {
        const [t, text] = rule.split(TYPE_SEPARATOR)
        const type = t as RuleType

        return (
          <div key={i} style={{ color: type === 'BAN' ? 'red' : 'white' }}>
            <Markdown markdown={text} />
          </div>
        )
      })}
    </>
  )
}

export default Rules
