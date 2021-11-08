import styled, { css } from 'styled-components';

const clickedStyle = css `
    color: #5ECE7B;
    border-bottom: 2px solid #5ECE7B;
`

const getLinkStyle = props => {
    if (props.index === props.category) {
        return clickedStyle
    } else return ""
}


export const StyledLink =  styled.p`
    ${getLinkStyle};
    font-size: 16px;
    padding: 0 16px 30px 16px !important;
`
