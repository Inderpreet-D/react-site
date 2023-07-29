import { useAppDispatch } from '../../../../hooks/redux'

import Button from '../../../atoms/Button'
import UploadButton from '../../../atoms/UploadButton'

import { open, download, selectFile } from '../../../../slices/toadVillage'

const HeaderButtons: React.FC = () => {
  const dispatch = useAppDispatch()

  return (
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
  )
}

export default HeaderButtons
