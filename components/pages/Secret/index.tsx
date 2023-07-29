import clsx from 'clsx'

import Container from '../../atoms/Container'
import TextField from '../../atoms/TextField'

import {
  part1,
  midParts,
  part3,
  decode
} from '../../../utilities/helpers/secret'

const textClassName = 'mt-0.5 p-0.5 break-all'

const Page = () => {
  const [userInput, setUserInput] = React.useState('')

  return (
    <Container className='flex flex-col overflow-hidden m-4 !w-screen !h-[100svh] my-0 rounded-none'>
      <div
        className={clsx(
          textClassName,
          'flex justify-center text-7xl font-bold tracking-wide text-primary-light mb-4'
        )}
      >
        {decode(userInput, part1)}
      </div>

      <div className='flex-grow overflow-y-auto'>
        {midParts.map((part, i) => (
          <div
            key={i}
            className={clsx(
              textClassName,
              'flex-shrink transition-all duration-1000 rounded-2xl text-xl !p-4 hover:bg-dark-dark'
            )}
          >
            {decode(userInput, part)}
          </div>
        ))}
      </div>

      <div
        className={clsx(
          textClassName,
          'flex justify-center text-base text-primary-dark'
        )}
      >
        {decode(userInput, part3)}
      </div>

      <form
        onSubmit={e => e.preventDefault()}
        className='flex justify-center w-full pt-5'
      >
        <TextField
          placeholder='Who are you to me?'
          onChange={e => setUserInput(e.target.value)}
          value={userInput}
          className='w-3/5'
        />
      </form>
    </Container>
  )
}

export default Page
