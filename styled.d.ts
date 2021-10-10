import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    background: string
    backgroundLight: string
    accent: string
    foreground: string
    foregroundDark: string
    text: string
  }
}
