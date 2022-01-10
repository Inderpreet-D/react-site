import ContainerSubTitle from '../../../atoms/ContainerSubTitle'

import { OrderedList, BanItem, GeneralItem, Markdown } from './styles'

type RulesProps = {
  rules: string[]
}

type RuleType = 'BAN' | 'GENERAL'

const TYPE_SEPARATOR = '::'

const Rules: React.FC<RulesProps> = ({ rules }) => {
  return (
    <>
      <ContainerSubTitle>Rules</ContainerSubTitle>

      <OrderedList>
        {rules.map((rule, i) => {
          const [t, text] = rule.split(TYPE_SEPARATOR)
          const type = t as RuleType
          const Item = type === 'BAN' ? BanItem : GeneralItem

          return (
            <Item key={i}>
              <Markdown markdown={text} />
            </Item>
          )
        })}
      </OrderedList>
    </>
  )
}

export default Rules
