import dynamic from 'next/dynamic'

import Container from '../../atoms/Container'
import ContainerBackButton from '../../atoms/ContainerBackButton'
import ContainerTitle from '../../atoms/ContainerTitle'
import Button from '../../atoms/Button'
import UploadButton from '../../atoms/UploadButton'
import ContainerError from '../../atoms/ContainerError'
import TextField from '../../atoms/TextField'
import TextArea from '../../atoms/TextArea'

const MTGCard = dynamic(() => import('../../molecules/MTGCard'))
const LoadingIcon = dynamic(() => import('../../atoms/LoadingIcon'))
const Dialog = dynamic(() => import('../../molecules/Dialog'))

import { nameSort } from '../../../utilities/helpers/toadvillage'
import { useToadVillageState } from '../../../providers/ToadVillageStateProvider'

const titleClassName = 'mx-0 my-5 text-3xl font-light underline'
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
            Total Cards ({commanderCount + otherCount})
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
