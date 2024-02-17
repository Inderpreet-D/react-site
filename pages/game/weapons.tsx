import Container from '../../components/atoms/Container'
import Page from '../../components/templates/Page'

import data from '../../public/weapons.json'

type WeaponData = Record<
  string,
  {
    title: string
    icon: string
    'base damage': number
    'base attack delay': number
    description: string[][]
    variants: {
      title: string
      text: string
    }[]
  }
>

const typed_data = data as WeaponData

const Weapons = () => {
  return (
    <Page title='Weapons'>
      <Container className='grid grid-cols-2 gap-4'>
        {Object.entries(typed_data).map(([name, weapon]) => (
          <div
            key={name}
            className='flex flex-col border-2 border-primary-dark rounded-md p-4 shadow-md hover:bg-slate-950'
          >
            <div className='flex flex-col mb-1 last:mb-0'>
              <div className='text-3xl mb-2'>{weapon.title}</div>

              <div>Base Damage: {weapon['base damage']}</div>

              <div>Base Attack Delay: {weapon['base attack delay']}</div>
            </div>

            <div className='mt-4'>
              {weapon.description.map((items, i) => (
                <div key={i} className='flex mb-2 last:mb-0'>
                  <div className='min-w-[15ch]'>
                    {i === 0 ? 'Description:' : <>Level {i}:</>}
                  </div>

                  <div className='grid'>
                    {items.map(item => (
                      <div key={item} className=''>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className='text-2xl mt-4 -mb-2'>Variants</div>

            <div className='mt-4 flex flex-col'>
              {weapon.variants.map(variant => (
                <div
                  key={variant.title}
                  className='flex flex-col mb-2 last:mb-0'
                >
                  <div className='mr-4'>{variant.title}</div>

                  <div className=''>{variant.text}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </Container>
    </Page>
  )
}

export default Weapons
