import Button from '../../atoms/Button'
import Container from '../../atoms/Container'
import ContainerBackButton from '../../atoms/ContainerBackButton'
import ContainerTitle from '../../atoms/ContainerTitle'

const Page = () => {
  const [addingSeason, setAddingSeason] = React.useState(false)

  return (
    <Container>
      <ContainerBackButton to='mtg' />

      <ContainerTitle>Add Competitive Record</ContainerTitle>

      <div className='flex'>
        <select
          value='test'
          className='mr-4 border bg-transparent border-solid border-sky-400 rounded-xl px-3 py-2 hover:bg-sky-300 hover:text-slate-700 transition-all duration-300 h-10 flex justify-center items-center box-border'
        >
          <option value='test'>TEST</option>
          <option value='test2'>TEST 2</option>
        </select>

        {!addingSeason ? (
          <Button onClick={() => setAddingSeason(true)}>Add Season</Button>
        ) : (
          <input
            placeholder='Add season'
            autoFocus
            onKeyDown={e => {
              if (e.key === 'Enter') {
                setAddingSeason(false)
              }
            }}
            onBlur={() => setAddingSeason(false)}
            className='outline-none px-3 py-1 m-0 h-10 border-sky-400 border border-solid text-sky-500 box-border rounded-xl'
          />
        )}
      </div>

      <div className='table w-full mt-8 border-solid border border-red-400 border-collapse border-spacing'>
        <div className='table-header-group border-b border-b-red-200'>
          <div className='table-row'>
            <div className='table-cell pl-4 py-2'>Name</div>
            <div className='table-cell pl-4'>Commander Name</div>
            <div className='table-cell pl-4'>Theme</div>
            <div className='table-cell pl-4'>Tribe</div>
            <div className='table-cell pl-4'>Companion</div>
          </div>
        </div>

        <div className='table-row-group'>
          <div className='table-row'>
            <div className='table-cell pl-4 pt-2'>A1</div>
            <div className='table-cell pl-4'>A2</div>
            <div className='table-cell pl-4'>A3</div>
            <div className='table-cell pl-4'>A4</div>
            <div className='table-cell pl-4'>A5</div>
          </div>

          <div className='table-row'>
            <div className='table-cell pl-4 pt-2'>B1</div>
            <div className='table-cell pl-4'>B2</div>
            <div className='table-cell pl-4'>B3</div>
            <div className='table-cell pl-4'>B4</div>
            <div className='table-cell pl-4'>B5</div>
          </div>
        </div>
      </div>

      <div className='flex items-center mt-8'>
        <div className='text-white text-xl mr-4'>Winner:</div>

        <select
          value='test'
          className='border bg-transparent border-solid border-sky-400 rounded-xl px-3 py-2 hover:bg-sky-300 hover:text-slate-700 transition-all duration-300 h-10 flex justify-center items-center box-border'
        >
          <option value='test'>TEST</option>
          <option value='test2'>TEST 2</option>
        </select>
      </div>

      <Button className='mt-4'>Submit</Button>
    </Container>
  )
}

export default Page
