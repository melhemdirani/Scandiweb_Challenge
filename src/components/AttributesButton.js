import React, { Component } from 'react';
import { StyledButton } from './StyledComponents/StyledButton.styles';

class AttributesButton extends Component {

    constructor(props){
        super(props);
        this.state={
            clicked: false
        };
    }
    checkIfClicked = () => {

        let displayValue = this.props.displayValue
        let stateAttributes = this.props.stateAttributes
        let attributeName = this.props.attributeName

        
        if( stateAttributes &&  stateAttributes.[attributeName] === displayValue && !this.state.clicked ){ 
            this.setState({clicked: true})
        } 
        if(stateAttributes && stateAttributes.[attributeName] !== displayValue && this.state.clicked ){
            this.setState({clicked: false})
        } 
        
    }
    componentDidUpdate(){
        this.checkIfClicked()
    }
    componentDidMount(){
        this.checkIfClicked()
    }
   
    render() {
        const { attributeType, attributeName, handleClick, displayValue, location, showCart } = this.props
   

        return (
            <StyledButton 
                displayValue={displayValue}
                attributeType={attributeType}
                clicked={this.state.clicked}
                location={location}
                onClick={() => handleClick(attributeName, displayValue) }
                showCart={showCart}
            >
               {displayValue} 
            </StyledButton>
        )
    }
}



export default  AttributesButton