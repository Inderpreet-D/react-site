import { CardResponse } from '../../../../pages/api/treachery/types'

const Card: React.FC<CardResponse> = ({ role, imgSrc, winCondition }) => (
  <div className='flex flex-col items-center'>
    <div className='text-center text-4xl'>Your Role is {role}</div>

    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      alt={
        imgSrc
          .split('/')
          .at(-1)
          ?.split('.')[0]
      }
      src={imgSrc}
      className='mx-0 my-6 border-4 border-sky-800 rounded-[30px] box-border px-2 py-2'
    />

    <div className='text-center border-2 border-sky-400 rounded-lg max-w-[80%] px-3 py-2 bg-slate-900 text-2xl'>
      {winCondition}
    </div>
  </div>
)

export default Card
