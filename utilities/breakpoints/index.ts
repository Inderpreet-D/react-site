import { Size, Breakpoints, ScreenTypes } from './types'

const size: Size = {
  base: ['0px', '319px'],
  mobile: ['320px', '480px'],
  tablet: ['481px', '768px'],
  laptop: ['769px', '1024px'],
  desktop: ['1025px']
}

const breakpoints: Breakpoints = Object.keys(size).reduce((prev, key) => {
  const st = key as ScreenTypes
  prev[st] = size[st]
    .map(
      (size: string, i: number) => `(${i === 0 ? 'min' : 'max'}-width: ${size})`
    )
    .join(' and ')
  return prev
}, {} as Breakpoints)

export default breakpoints
