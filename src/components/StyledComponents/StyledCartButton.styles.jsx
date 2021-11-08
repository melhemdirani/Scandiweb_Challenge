import styled, { css } from 'styled-components';

const viewBagStyle = css `
    color: #1D1F22;
    border-color: #1D1F22;
    background-color: white;
`
const checkoutStyle = css `
    color: #FFFFFF;
    border-color: #5ECE7B;
    background-color: #5ECE7B;
    border: none;
`


const getButtonStyle = props => {
    if (props.location === "view bag") {
        return viewBagStyle
    } else return checkoutStyle
}
const smallButton = css `
    width: 24px;
    height: 24px;
`
const LargeButton = css `
    width: 45px;
    height: 45px;
`



export const StyledCartButton =  styled.button`
    ${getButtonStyle};
    width: 140px;
    height: 43px;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
`
