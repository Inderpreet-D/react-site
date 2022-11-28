import { ToadVillageState } from '.'
import { FormattedCard } from '../../shared/toadvillage'

export const findCard = (
  name: string,
  isCommander: boolean,
  state: ToadVillageState
) => {
  const check = ({ card }: FormattedCard) => card.name === name

  const list = isCommander ? state.cardObjs.commanders : state.cardObjs.others

  return list.find(check)
}
