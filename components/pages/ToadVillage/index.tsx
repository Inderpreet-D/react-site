import { FormattedCard } from '../../../shared/toadvillage'

import Container from '../../atoms/Container'
import ContainerBackButton from '../../atoms/ContainerBackButton'
import ContainerTitle from '../../atoms/ContainerTitle'
import Button from '../../atoms/Button'
import UploadButton from '../../atoms/UploadButton'
import ContainerError from '../../atoms/ContainerError'
import TextField from '../../atoms/TextField'
import TextArea from '../../atoms/TextArea'
import MTGCard from '../../molecules/MTGCard'
import LoadingIcon from '../../atoms/LoadingIcon'
import Dialog from '../../molecules/Dialog'

import { nameSort } from '../../../utilities/helpers/toadvillage'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import {
  addCard,
  cancel,
  close,
  download,
  moveCard,
  open,
  removeCard,
  selectFile,
  selectToadVillage,
  setCardString,
  setName,
  startApiWork
} from '../../../slices/toadVillage'
import useSWR from '../../../hooks/useSWR'

const titleClassName =
  'flex items-center justify-left mx-0 my-5 text-3xl font-light underline'
const cardBlockClassName =
  'grid grid-cols-1 w-full p-0 sm:grid-cols-2 md:grid-cols-3'

const Page = () => {
  const dispatch = useAppDispatch()
  const {
    cardObjs,
    error,
    name,
    loading,
    showDialog,
    cardListString
  } = useAppSelector(selectToadVillage)

  const [commanderCount, otherCount, combinedCards] = React.useMemo(() => {
    const { commanders = [], others = [] } = cardObjs
    const reducer = (t: number, { amount }: FormattedCard) => t + amount
    return [
      commanders.reduce(reducer, 0),
      others.reduce(reducer, 0),
      [...commanders, ...others]
    ]
  }, [cardObjs])

  const totalPrice = React.useMemo(() => {
    let total = 0

    combinedCards.forEach(card => {
      total += card.amount * +card.card.prices.usd
    })

    return total
  }, [combinedCards])

  const { data: price, isLoading: isLoadingMoney } = useSWR<number>(() =>
    totalPrice > 0 ? `/money?amount=${totalPrice}` : null
  )

  return (
    <Container>
      <ContainerBackButton to='mtg' />

      <ContainerTitle>Toad Village</ContainerTitle>

      <div className='flex flex-col justify-center mb-5 sm:flex-row'>
        <Button
          onClick={() => dispatch(open())}
          aria-label='Import Deck'
          className='w-full mr-0 mb-4 sm:w-auto sm:mr-4 sm:mb-0'
        >
          Import Deck List
        </Button>

        <Button
          onClick={() => dispatch(download())}
          aria-label='Download'
          className='w-full mr-0 mb-4 sm:w-auto sm:mr-4 sm:mb-0'
        >
          Download
        </Button>

        <UploadButton
          onFileSelected={files => dispatch(selectFile(files))}
          aria-label='Extract List'
          accept='.json'
        >
          Extract List from JSON
        </UploadButton>
      </div>

      {error && <ContainerError>{error}</ContainerError>}

      <div className='flex justify-center mb-5'>
        <TextField
          value={name}
          onChange={e => dispatch(setName(e.target.value))}
          placeholder='Enter your deck name'
          aria-label='Deck name'
          className='w-full sm:w-9/12'
        />
      </div>

      {loading && <LoadingIcon />}

      {!loading && cardObjs.commanders && cardObjs.others && (
        <>
          <div className={titleClassName}>
            <div>Total Cards ({commanderCount + otherCount})</div>

            {!isLoadingMoney && (
              <div className='ml-4'>
                Total Price: ${(price ?? 0).toFixed(2)} CAD
              </div>
            )}
          </div>

          <div className={titleClassName}>
            Commander Options / Sideboard ({commanderCount})
          </div>

          <div className={cardBlockClassName}>
            {cardObjs.commanders.sort(nameSort).map((card, i) => (
              <MTGCard
                key={i}
                onClickMove={(name, isCommander) => {
                  dispatch(moveCard({ name, isCommander }))
                }}
                onClickAdd={(name, isCommander) => {
                  dispatch(addCard({ name, isCommander }))
                }}
                onClickRemove={(name, isCommander) => {
                  dispatch(removeCard({ name, isCommander }))
                }}
                isCommander={true}
                {...card}
              />
            ))}
          </div>

          <div className={titleClassName}>Deck ({otherCount})</div>

          <div className={cardBlockClassName}>
            {[...cardObjs.others].sort(nameSort).map((card, i) => (
              <MTGCard
                key={i}
                onClickMove={(name, isCommander) => {
                  dispatch(moveCard({ name, isCommander }))
                }}
                onClickAdd={(name, isCommander) => {
                  dispatch(addCard({ name, isCommander }))
                }}
                onClickRemove={(name, isCommander) => {
                  dispatch(removeCard({ name, isCommander }))
                }}
                isCommander={false}
                {...card}
              />
            ))}
          </div>
        </>
      )}

      {showDialog && (
        <Dialog
          open={showDialog}
          onClose={() => dispatch(close())}
          title='Enter Decklist'
          actions={
            <div className='flex flex-col justify-center w-full sm:flex-row'>
              <Button
                onClick={() => dispatch(cancel())}
                className='mb-4 w-full sm:mb-0 sm:w-auto sm:mr-4'
              >
                Cancel
              </Button>

              <Button onClick={() => dispatch(startApiWork())}>Submit</Button>
            </div>
          }
        >
          <TextArea
            autoFocus
            onChange={e => dispatch(setCardString(e.target.value))}
            value={cardListString}
            rows={20}
            placeholder="Enter your cards, one per line, in the format of 'NUMBER NAME'"
            className='w-full h-full'
          />
        </Dialog>
      )}
    </Container>
  )
}

export default Page
