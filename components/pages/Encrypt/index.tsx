import {
  StyledContainer,
  StyledHolder,
  StyledControls,
  StyledTextField
} from './styles'
import MessageBlock from './MessageBlock'
import Button from '../../atoms/Button'

const Page = () => {
  const [values, setValues] = React.useState<{ [x: string]: string }>({})
  const [secret, setSecret] = React.useState('')

  const handleChange = React.useCallback(
    (prop: string) => (value: string) => {
      setValues(old => ({ ...old, [prop]: value }))
    },
    []
  )

  const handleAdd = React.useCallback(() => {
    setValues(old => ({ ...old, [Object.keys(old).length.toString()]: '' }))
  }, [])

  return (
    <StyledContainer>
      <StyledHolder>
        {Object.entries(values).map(([k, v]) => (
          <MessageBlock
            key={k}
            value={v}
            onChange={handleChange(k)}
            secret={secret}
          />
        ))}
      </StyledHolder>

      <StyledControls>
        <StyledTextField
          value={secret}
          onChange={e => setSecret(e.target.value)}
          placeholder='Enter secret phrase'
        />

        <Button onClick={handleAdd}>Add</Button>
      </StyledControls>
    </StyledContainer>
  )
}

export default Page
