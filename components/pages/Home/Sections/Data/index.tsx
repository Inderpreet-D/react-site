import { SectionProps } from '../..'
import { KV } from '../../Data/me'

const Data: React.FC<SectionProps> = ({ data }) => (
  <div className='grid grid-cols-1 p-4 lg:grid-cols-2'>
    {(data as KV[]).map(({ key, value }, i) => (
      <div key={i} className='flex items-center justify-center m-2 pr-12 group'>
        <div className='font-bold text-primary-dark group-hover:text-primary-light transition-all duration-500 w-min md:w-auto'>
          {key}
        </div>

        <div className='mx-2 h-full border-r border-r-primary-dark group-hover:flex-grow transition-all duration-500' />

        <div className='flex-grow group-hover:flex-grow-0 transition-all duration-500 ease-in-out' />

        <div className='italic group-hover:text-primary-light transition-all duration-500 ease-in-out'>
          {value} year{value === 1 ? '' : 's'}
        </div>
      </div>
    ))}
  </div>
)

export default Data
