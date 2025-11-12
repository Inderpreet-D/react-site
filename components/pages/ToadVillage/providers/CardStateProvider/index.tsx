import { useAppSelector } from "../../../../../hooks/redux";

import {
  FormattedCard,
  TreacheryResponse,
} from "../../../../../shared/toadvillage";

import { nameSort } from "../../../../../utilities/helpers/toadvillage";
import { selectToadVillage } from "../../../../../slices/toadVillage";

export const titleClassName =
  "flex items-center justify-left mx-0 my-5 text-3xl font-light cursor-pointer select-none";

type SortType = {
  name: string;
  sort: (c1: FormattedCard, c2: FormattedCard) => number;
};

type ContextType = {
  selectedSort: SortType;
  setSelectedSort: React.Dispatch<React.SetStateAction<SortType>>;
  commanderCount: number;
  otherCount: number;
  combinedCards: FormattedCard[];
  tokenCount: number;
  counts: Record<keyof TreacheryResponse, number>;
};

const CardStateContext = React.createContext<ContextType | null>(null);

type CardStateProviderProps = {
  children: React.ReactNode;
};

const CardStateProvider: React.FC<CardStateProviderProps> = ({ children }) => {
  const { cardObjs } = useAppSelector(selectToadVillage);

  const [selectedSort, setSelectedSort] = React.useState<SortType>({
    name: "Alphabetical (a-z)",
    sort: nameSort,
  });

  const { commanderCount, otherCount, combinedCards, tokenCount } =
    React.useMemo(() => {
      const { commanders = [], others = [], tokens = [] } = cardObjs;
      const reducer = (t: number, { amount }: FormattedCard) => t + amount;
      return {
        commanderCount: commanders.reduce(reducer, 0),
        otherCount: others.reduce(reducer, 0),
        combinedCards: [...commanders, ...others],
        tokenCount: tokens.reduce(reducer, 0),
      };
    }, [cardObjs]);

  const counts = React.useMemo(
    () =>
      ({
        commanders: commanderCount,
        others: otherCount,
        tokens: tokenCount,
        unmatched: 0,
      } as Record<keyof TreacheryResponse, number>),
    [commanderCount, otherCount, tokenCount]
  );

  return (
    <CardStateContext.Provider
      value={{
        selectedSort,
        setSelectedSort,
        commanderCount,
        otherCount,
        combinedCards,
        tokenCount,
        counts,
      }}
    >
      {children}
    </CardStateContext.Provider>
  );
};

export default CardStateProvider;

export const useCardState = () =>
  React.useContext(CardStateContext) as ContextType;
