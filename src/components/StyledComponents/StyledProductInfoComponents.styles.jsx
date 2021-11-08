import styled, { css } from 'styled-components';

// Product Info

const smallFont = css `
    font-size: 16px;
    font-weight: 300;
`
const largeFont = css `
    font-size: 30px;
`
const lightFont = css `
    font-weight: 300;
`
const mediumBold= css `
    font-weight: 600;
`
const largePrice= css `
    font-weight: 700;
    font-size: 24px;
`
const smallPrice= css `
    font-weight: 500;
    font-size: 18px;
`
const attributeStyle = css `
    font-weight: 700;
    font-size: 18px;
    font-family: 'Raleway', sans-serif;
`

const getFontSize = props => {
    if (props.location === "header") {
        return smallFont
    } else return largeFont
}

const getStyles = props => {
    if (props.price){
        if (props.location === "header") {
            return smallPrice
        } else return largePrice
    }  
    if (props.subTitle && props.location !== "header"){
        return mediumBold
    } 
    if (props.location === "header") {
        return lightFont
    }
    if (props.attribute){
        if (props.location === "header") {
            return smallPrice
        } else return attributeStyle
    }
}



export const PTagStyle =  styled.p`
    font-weight: 400;
    ${getFontSize};
    ${getStyles};
`
    