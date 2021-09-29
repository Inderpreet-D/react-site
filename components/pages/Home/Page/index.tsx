import React from 'react'

import Container, { ContainerTitle } from '../../../atoms/Container'
import { Article, Data, Date } from './Sections'
import Control from '../../../atoms/Control'
import {
  Separator,
  Box,
  ButtonHolder,
  Button,
  Card,
  Section
} from '../../../atoms/BoxView'

import meRaw from './Data/me'

const me = [
  'Publications',
  'Experience',
  'Education',
  'Technologies',
  'Languages'
].map(title => meRaw.find(item => item.title === title)!)

const components = { Article, Data, Date }

const Page = () => {
  const [idx, setIdx] = React.useState(0)
  const [panelIdx, setPanelIdx] = React.useState(0)

  const update = (i: number) => () => {
    setIdx(i)
    setPanelIdx(0)
  }

  const updatePanel = (i: number) => () => setPanelIdx(old => old + i)

  const { type, data } = me[idx]
  const SectionComponent = components[type]

  const showControls = type !== 'Data' && data.length > 1

  return (
    <Container>
      <ContainerTitle>Inderpreet Dhillon</ContainerTitle>

      <Separator />

      <Box>
        <ButtonHolder>
          {me.map(({ title }, i) => (
            <Button key={i} active={idx === i} onMouseEnter={update(i)}>
              {title}
            </Button>
          ))}
        </ButtonHolder>

        <Card>
          {showControls && (
            <Control
              current={panelIdx}
              last={data.length}
              onForward={updatePanel(1)}
              onBack={updatePanel(-1)}
            />
          )}

          <Section>
            <SectionComponent data={data} idx={panelIdx} />
          </Section>
        </Card>
      </Box>
    </Container>
  )
}

export default Page
