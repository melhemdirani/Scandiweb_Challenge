import styled, { css } from 'styled-components';



const brightnessCalcul = css`
    filter: ${props => (props.dark ? 'brightness(83%)' : '')};
`

export const StyledComponentBrightness = styled.div`    
  ${brightnessCalcul};
`

