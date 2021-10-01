import axios from 'axios'

import { initialState, toadVillageReducer, Actions } from './reducer'

import {
  StyledButtonHolder,
  StyledTextFieldHolder,
  StyledTextField,
  StyledHeader,
  StyledCardBlock,
  StyledTextArea
} from './styles'
import Container, {
  ContainerTitle,
  ContainerError
} from '../../../atoms/Container'
import MTGCard from '../../../molecules/MTGCard'
import LoadingIcon from '../../../atoms/LoadingIcon'
import Dialog from '../../../molecules/Dialog'
import Button from '../../../atoms/Button'
import UploadButton from '../../../atoms/UploadButton'

import {
  nameSort,
  downloadDecklist,
  parseJSON
} from '../../../../utilities/helpers/toadvillage'
import { ID_KEY } from '../../../../shared/constants'

const Page = () => {
  const [state, dispatch] = React.useReducer(toadVillageReducer, initialState)
  const [showDialog, setShowDialog] = React.useState(false)

  // Poll api to check status every 0.1s
  const waitForResponse = React.useCallback(() => {
    const interval = setInterval(async () => {
      const id = localStorage.getItem(ID_KEY)
      const { data } = await axios.post('/api/toadvillage', { id })
      const { status, ...rest } = data

      if (status === 'DONE') {
        dispatch({ type: Actions.DECK_RESPONSE, data: rest })
        clearInterval(interval)
      }
    }, 100)
  }, [])

  // Fetches cards after closing dialog
  React.useEffect(() => {
    if (!state.cardList.length) {
      dispatch({ type: Actions.RESET_CARD_OBJS })
      return
    }

    if (showDialog) {
      return
    }

    const handleFetch = async () => {
      const id = localStorage.getItem(ID_KEY)
      await axios.post('/api/toadvillage', { id, cards: state.cardList })
      waitForResponse()
    }

    dispatch({ type: Actions.START_FETCH })
    handleFetch()
  }, [state.cardList, showDialog, waitForResponse])

  // Starts the download
  const handleDownload = React.useCallback(() => {
    dispatch({ type: Actions.DOWNLOAD })
  }, [])

  const handleOpen = React.useCallback(() => setShowDialog(true), [])

  const handleClose = React.useCallback(() => setShowDialog(false), [])

  const handleCancel = React.useCallback(() => {
    dispatch({ type: Actions.CANCEL })
    handleClose()
  }, [handleClose])

  const handleSetCards = React.useCallback(value => {
    dispatch({ type: Actions.SET_CARDS_STRING, value })
  }, [])

  const findCard = React.useCallback((name, isCommander) => {
    const check = ({ card }) => card.name === name
    const list = isCommander ? cardObjs.commanders : cardObjs.others
    return list.find(check)
  }, [])

  const handleMove = React.useCallback(
    (name, isCommander) => {
      const cardObj = findCard(name, isCommander)
      dispatch({ type: Actions.MOVE, cardObj, isCommander })
    },
    [findCard]
  )

  const handleCountChange = React.useCallback(
    (name, isCommander, increment) => {
      const cardObj = findCard(name, isCommander)
      dispatch({ type: Actions.CHANGE_COUNT, cardObj, isCommander, increment })
    },
    [findCard]
  )

  const handleAdd = React.useCallback(
    (name, isCommander) => {
      handleCountChange(name, isCommander, true)
    },
    [handleCountChange]
  )

  const handleRemove = React.useCallback(
    (name, isCommander) => {
      handleCountChange(name, isCommander, false)
    },
    [handleCountChange]
  )

  const handleFileSelect = React.useCallback(files => {
    dispatch({ type: Actions.CLEAR_ERROR })

    if (files.length === 0) {
      return
    }

    const file = files[0]

    if (!file.name.endsWith('.json')) {
      return
    }

    const reader = new FileReader()

    reader.onload = e => {
      const data = JSON.parse(e.target.result)

      try {
        const list = parseJSON(data)
        downloadDecklist(list, file)
      } catch (err) {
        const error =
          'Could not extract the decklist from that file, try a different one.'
        dispatch({ type: Actions.SET_ERROR, error })
      }
    }

    reader.readAsText(file)
  }, [])

  const sumReducer = React.useCallback((t, { amount }) => {
    return t + amount
  }, [])
  const commanderCount = React.useMemo(() => {
    return state.cardObjs.commanders?.reduce(sumReducer, 0)
  }, [state.cardObjs.commanders, sumReducer])
  const otherCount = React.useMemo(() => {
    return state.cardObjs.others?.reduce(sumReducer, 0)
  }, [state.cardObjs.others, sumReducer])

  return (
    <Container>
      <ContainerTitle>Toad Village</ContainerTitle>

      <StyledButtonHolder>
        <Button onClick={handleOpen}>Import Deck List</Button>

        <Button onClick={handleDownload}>Download</Button>

        <UploadButton onFileSelected={handleFileSelect}>
          Extract List from JSON
        </UploadButton>
      </StyledButtonHolder>

      {state.error && <ContainerError>{state.error}</ContainerError>}

      <StyledTextFieldHolder>
        <StyledTextField
          value={state.name}
          onChange={e =>
            dispatch({ type: Actions.SET_NAME, name: e.target.value })
          }
          placeholder='Enter your deck name'
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
    </Container>
  )
}

export default Page
