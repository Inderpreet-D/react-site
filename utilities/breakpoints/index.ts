import { Size, Breakpoints, ScreenTypes } from './types'

const size: Size = {
  mobile: ['20rem', '30rem'],
  tablet: ['30.0625rem', '48rem'],
  laptop: ['48.0625rem', '64rem'],
  desktop: ['64.0625rem']
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
