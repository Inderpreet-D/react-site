enum ScreenTypes {
  mobile = 'mobile',
  tablet = 'tablet',
  laptop = 'laptop',
  desktop = 'desktop'
}

export type Size = {
  [x in ScreenTypes]: string[]
}

export type Breakpoints = {
  [x in ScreenTypes]: string
}
