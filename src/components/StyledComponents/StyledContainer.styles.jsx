import styled, { css } from 'styled-components';

import { createGlobalStyle } from 'styled-components'

const globalContainer = createGlobalStyle`
  body {
    background-color: ${props => (props.dark ? 'rgba(57, 55, 72, 0.22)' : '')};
  }
`
const brightnessCalcul = css`
    filter: ${props => (props.dark ? 'brightness(83%)' : '')};
`
export const StyledContainer =  styled.div`
  ${globalContainer};
`
export const StyledComponentBrightness = styled.div`    
  ${brightnessCalcul};
`

