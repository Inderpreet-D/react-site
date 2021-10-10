import axios from 'axios'

import { FormattedCard } from '../../shared/toadvillage'

import { State, toadVillageReducer, initialState } from './reducer'

import {
  downloadDecklist,
  parseJSON
} from '../../utilities/helpers/toadvillage'
import { ID_KEY } from '../../shared/constants'
import { QueueType } from '../../pages/api/toadvillage/types'

type ContextType = {
  state: State
  showDialog: boolean
  handleOpen: () => void
  handleDownload: () => void
  handleFileSelect: (files: FileList | null) => void
  handleSetName: (name: string) => void
  handleMove: (name: string, isCommander: boolean) => void
  handleAdd: (name: string, isCommander: boolean) => void
  handleRemove: (name: string, isCommander: boolean) => void
  commanderCount: number
  otherCount: number
  handleClose: () => void
  handleCancel: () => void
  handleSetCards: (value: string) => void
}

const ToadVillageStateContext = React.createContext<ContextType | null>(null)

const ToadVillageStateProvider: React.FC = ({ children }) => {
  const [showDialog, setShowDialog] = React.useState(false)
  const [state, dispatch] = React.useReducer(toadVillageReducer, initialState)

  // Poll api to check status every 0.1s
  const waitForResponse = React.useCallback(() => {
    const interval = setInterval(async () => {
      const id = localStorage.getItem(ID_KEY)
      const { data } = (await axios.post('/api/toadvillage', { id })) as {
        data: QueueType
      }
      const { status, ...rest } = data

      if (status === 'DONE') {
        dispatch({ type: 'DECK_RESPONSE', data: rest })
        clearInterval(interval)
      }
    }, 100)
  }, [])

  // Fetches cards after closing dialog
  React.useEffect(() => {
    if (!state.cardList.length) {
      dispatch({ type: 'RESET_CARD_OBJS' })
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

    dispatch({ type: 'START_FETCH' })
    handleFetch()
  }, [state.cardList, showDialog, waitForResponse])

  // Starts the download
  const handleDownload = React.useCallback(() => {
    dispatch({ type: 'DOWNLOAD' })
  }, [])

  const handleOpen = React.useCallback(() => setShowDialog(true), [])

  const handleClose = React.useCallback(() => setShowDialog(false), [])

  const handleCancel = React.useCallback(() => {
    dispatch({ type: 'CANCEL' })
    handleClose()
  }, [handleClose])

  const handleSetCards = React.useCallback(value => {
    dispatch({ type: 'SET_CARDS_STRING', value })
  }, [])

  const findCard = React.useCallback(
    (name: string, isCommander: boolean) => {
      const check = ({ card }: FormattedCard) => card.name === name
      const list = isCommander
        ? state.cardObjs.commanders
        : state.cardObjs.others
      return list.find(check)
    },
    [state.cardObjs]
  )

  const handleMove = React.useCallback(
    (name: string, isCommander: boolean) => {
      const cardObj = findCard(name, isCommander)
      dispatch({ type: 'MOVE', cardObj, isCommander })
    },
    [findCard]
  )

  const handleCountChange = React.useCallback(
    (name: string, isCommander: boolean, increment: boolean) => {
      const cardObj = findCard(name, isCommander)
      dispatch({ type: 'CHANGE_COUNT', cardObj, isCommander, increment })
    },
    [findCard]
  )

  const handleAdd = React.useCallback(
    (name: string, isCommander: boolean) => {
      handleCountChange(name, isCommander, true)
    },
    [handleCountChange]
  )

  const handleRemove = React.useCallback(
    (name: string, isCommander: boolean) => {
      handleCountChange(name, isCommander, false)
    },
    [handleCountChange]
  )

  const handleFileSelect = React.useCallback((files: FileList | null) => {
    dispatch({ type: 'CLEAR_ERROR' })

    if (!files || files.length === 0) {
      return
    }

    const file = files[0]

    if (!file.name.endsWith('.json')) {
      return
    }

    const reader = new FileReader()

    reader.onload = e => {
      const res = e.target!.result!.toString()
      const data = JSON.parse(res)

      try {
        const list = parseJSON(data)
        downloadDecklist(list, file)
      } catch (err) {
        const error =
          'Could not extract the decklist from that file, try a different one.'
        dispatch({ type: 'SET_ERROR', error })
      }
    }

    reader.readAsText(file)
  }, [])

  const handleSetName = React.useCallback((name: string) => {
    dispatch({ type: 'SET_NAME', name })
  }, [])

  const sumReducer = React.useCallback(
    (t: number, { amount }: FormattedCard) => {
      return t + amount
    },
    []
  )
  const commanderCount = React.useMemo(() => {
    return state.cardObjs.commanders?.reduce(sumReducer, 0)
  }, [state.cardObjs.commanders, sumReducer])
  const otherCount = React.useMemo(() => {
    return state.cardObjs.others?.reduce(sumReducer, 0)
  }, [state.cardObjs.others, sumReducer])

  return (
    <ToadVillageStateContext.Provider
      value={{
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
      }}
    >
      {children}
    </ToadVillageStateContext.Provider>
  )
}

export default ToadVillageStateProvider

export const useToadVillageState = () =>
  React.useContext(ToadVillageStateContext) as ContextType
