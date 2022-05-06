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
import { useToadVillageState } from '../../../providers/ToadVillageStateProvider'
import useSWR from '../../../hooks/useSWR'

const titleClassName =
  'flex items-center justify-left mx-0 my-5 text-3xl font-light underline'
const cardBlockClassName =
  'grid grid-cols-1 w-full p-0 sm:grid-cols-2 md:grid-cols-3'

const Page = () => {
  const {
    state,
    showDialog,
    handleOpen,
    handleDownload,
    handleFileSelect,
    handleSetName,
    handleMove,
    handleAdd,
    handleRemove,
    commanderCount,
    otherCount,
    handleClose,
    handleCancel,
    handleSetCards
  } = useToadVillageState()

  const combinedCards = React.useMemo(
    () => [
      ...(state.cardObjs?.commanders ?? []),
      ...(state.cardObjs?.others ?? [])
    ],
    [state.cardObjs]
  )

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
          onClick={handleOpen}
          aria-label='Import Deck'
          className='w-full mr-0 mb-4 sm:w-auto sm:mr-4 sm:mb-0'
        >
          Import Deck List
        </Button>

        <Button
          onClick={handleDownload}
          aria-label='Download'
          className='w-full mr-0 mb-4 sm:w-auto sm:mr-4 sm:mb-0'
        >
          Download
        </Button>

        <UploadButton
          onFileSelected={handleFileSelect}
          aria-label='Extract List'
          accept='.json'
        >
          Extract List from JSON
        </UploadButton>
      </div>

      {state.error && <ContainerError>{state.error}</ContainerError>}

      <div className='flex justify-center mb-5'>
        <TextField
          value={state.name}
          onChange={e => handleSetName(e.target.value)}
          placeholder='Enter your deck name'
          aria-label='Deck name'
          className='w-full sm:w-9/12'
        />
      </div>

      {state.loading && <LoadingIcon />}

      {!state.loading && state.cardObjs.commanders && state.cardObjs.others && (
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
            {state.cardObjs.commanders.sort(nameSort).map((card, i) => (
              <MTGCard
                key={i}
                onClickMove={handleMove}
                onClickAdd={handleAdd}
                onClickRemove={handleRemove}
                isCommander={true}
                {...card}
              />
            ))}
          </div>

          <div className={titleClassName}>Deck ({otherCount})</div>

          <div className={cardBlockClassName}>
            {state.cardObjs.others.sort(nameSort).map((card, i) => (
              <MTGCard
                key={i}
                onClickMove={handleMove}
                onClickAdd={handleAdd}
                onClickRemove={handleRemove}
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
          onClose={handleClose}
          title='Enter Decklist'
          actions={
            <div className='flex flex-col justify-center w-full sm:flex-row'>
              <Button
                onClick={handleCancel}
                className='mb-4 w-full sm:mb-0 sm:w-auto sm:mr-4'
              >
                Cancel
              </Button>

              <Button onClick={handleClose}>Submit</Button>
            </div>
          }
        >
          <TextArea
            autoFocus
            onChange={e => handleSetCards(e.target.value)}
            value={state.cardListString}
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
