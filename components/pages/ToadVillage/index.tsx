import dynamic from 'next/dynamic'

import {
  StyledButtonHolder,
  StyledTextFieldHolder,
  StyledTextField,
  StyledHeader,
  StyledCardBlock,
  StyledTextArea
} from './styles'
import Container from '../../atoms/Container'
import ContainerError from '../../atoms/ContainerError'
import ContainerBackButton from '../../atoms/ContainerBackButton'
import ContainerTitle from '../../atoms/ContainerTitle'
import Button from '../../atoms/Button'
import UploadButton from '../../atoms/UploadButton'

const MTGCard = dynamic(() => import('../../molecules/MTGCard'))
const LoadingIcon = dynamic(() => import('../../atoms/LoadingIcon'))
const Dialog = dynamic(() => import('../../molecules/Dialog'))

import { nameSort } from '../../../utilities/helpers/toadvillage'
import { useToadVillageState } from '../../../providers/ToadVillageStateProvider'

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

      <StyledButtonHolder>
        <Button onClick={handleOpen} aria-label='Import Deck'>
          Import Deck List
        </Button>

        <Button onClick={handleDownload} aria-label='Download'>
          Download
        </Button>

        <UploadButton
          onFileSelected={handleFileSelect}
          aria-label='Extract List'
        >
          Extract List from JSON
        </UploadButton>
      </StyledButtonHolder>

      {state.error && <ContainerError>{state.error}</ContainerError>}

      <StyledTextFieldHolder>
        <StyledTextField
          value={state.name}
          onChange={e => handleSetName(e.target.value)}
          placeholder='Enter your deck name'
          aria-label='Deck name'
        />
      </StyledTextFieldHolder>

      {state.loading && <LoadingIcon />}

      {!state.loading && state.cardObjs.commanders && state.cardObjs.others && (
        <>
          <StyledHeader>
            Total Cards ({commanderCount + otherCount})
          </StyledHeader>

          <StyledHeader>
            Commander Options / Sideboard ({commanderCount})
          </StyledHeader>

          <StyledCardBlock>
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
          </StyledCardBlock>

          <StyledHeader>Deck ({otherCount})</StyledHeader>

          <StyledCardBlock>
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
          </StyledCardBlock>
        </>
      )}

      {showDialog && (
        <Dialog
          open={showDialog}
          onClose={handleClose}
          title='Enter Decklist'
          actions={
            <StyledButtonHolder style={{ marginBottom: 0 }}>
              <Button onClick={handleCancel}>Cancel</Button>

              <Button onClick={handleClose}>Submit</Button>
            </StyledButtonHolder>
          }
        >
          <StyledTextArea
            autoFocus
            onChange={e => handleSetCards(e.target.value)}
            value={state.cardListString}
            rows={20}
            placeholder="Enter your cards, one per line, in the format of 'NUMBER NAME'"
          />
        </Dialog>
      )}
    </Container>
  )
}

export default Page
