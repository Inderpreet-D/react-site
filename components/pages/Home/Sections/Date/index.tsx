import { Date as DateType } from '../../Data/me'
import { SectionProps } from '../..'

import Header from './Header'

const Date: React.FC<SectionProps> = ({ data, idx }) => {
  const { name, location, title, date, points } = data[idx] as DateType

  return (
    <div className='flex flex-col p-4'>
      <Header title={name} subtitle={location} />

      <Header title={title} subtitle={date} />

      <ul className='p-4 list-outside list-disc'>
        {points.map((point, i) => (
          <li key={i} className='mb-3'>
            {point}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Date
