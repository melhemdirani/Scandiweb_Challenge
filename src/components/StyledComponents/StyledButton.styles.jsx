import styled, { css } from 'styled-components';

// cartover lay buttons

const cartSwatchStyle = css `
    color: ${props => props.displayValue};
    background-color: ${props => props.displayValue};
    border: none;
    box-shadow: 1px 1px 2px  black;
    font-size: 1px !important;
    width: 27px !important;

`
const cartSwatchFocusStyle = css `
    color: ${props => props.displayValue};
    background-color: ${props => props.displayValue};
    border: none;
    box-shadow: 1px 1px 2px  black;
    border: 2px solid red;
    font-size: 1px !important;
    width: 27px !important;
`
const cartTextStyle = css `
    color: black;
    background-color: white;
    border: 1px solid #1D1F22;
`
const cartTextFocusStyle = css `
    color: white;
    background-color: #1D1F22;
    border: 1px solid #1D1F22;
`
const cartButtonDimensions = css `
    width: auto;
    height: 27px;
    font-size: 14px;
    margin-right: 8px;
    margin-top: 5px
`

// product description buttons

const swatchStyle = css `
    color: ${props => props.displayValue};
    background-color: ${props => props.displayValue};
    border: none;
    box-shadow: 1px 1px 2px  black;
`
const swatchFocusStyle = css `
    color: ${props => props.displayValue};
    background-color: ${props => props.displayValue};
    border: none;
    box-shadow: 1px 1px 2px  black;
    border: 2px solid red;
`
const textStyle = css `
    color: black;
    background-color: white;
    border: 1px solid #1D1F22;
`
const textFocusStyle = css `
    color: white;
    background-color: #1D1F22;
    border: 1px solid #1D1F22;
`
const largeButtonDimensions = css `
    width: 63px;
    height: 45px;
    margin-right: 12px;
    margin-bottom: 20px;
`
const pointerCursor = css `
    cursor: pointer;
`

const getButtonDimensions = props => {
    if (props.location === "header" || props.location === "Product_Listing" ) {
        return cartButtonDimensions
    } else return largeButtonDimensions
}
const getCursor = props => {
    if (props.location === "productDescription" || props.location === "Product_Listing") {
        return pointerCursor
    } else return ""
}

const getButtonStyle = props => {
    if (props.location === "header") {
        if (props.clicked){
            if (props.attributeType === "swatch"){
                return cartSwatchFocusStyle
            }
            return cartTextFocusStyle

        } else {
            if (props.attributeType === "swatch"){
                return cartSwatchStyle
            }
            return cartTextStyle
        }
    } else {
        if (props.clicked){
            if (props.attributeType === "swatch"){
                return swatchFocusStyle
            }
            return textFocusStyle

        } else {
            if (props.attributeType === "swatch"){
                return swatchStyle
            }
            return textStyle
        }
    }
}
export const StyledButton =  styled.button`
    ${getButtonStyle};
    ${getButtonDimensions};
    ${getCursor};
    
`

  