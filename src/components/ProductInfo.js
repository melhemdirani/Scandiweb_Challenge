import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setAttributesCount } from '../redux/cart/cart.action';
import '../Styles/ProductInfo.styles.css'
import AttributesButton from './AttributesButton';
import { PTagStyle } from './StyledComponents/StyledProductInfoComponents.styles';


class ProductInfo extends Component {
   
    componentDidMount(){
        this.props.setAttributesCount(this.props.attributes.length)
    }

    handleClick = (a, b) => {
        if(this.props.location === "productDescription"){       // add the attribute to the items array 
            this.props.setAttribute(a, b)
        };
    }
    render() {
        const {brand, name, amount, currencies, currency, attributes, location, stateAttributes} = this.props
        return (
            <div className="ProductInfo_Container"  >
                <PTagStyle location={location} subTitle={true} style={{marginBottom: "5px", marginTop: "0"}}> {brand} </PTagStyle>
                <PTagStyle location={location} style={{marginBottom: "10px", marginTop: "0"}}>{name}</PTagStyle>
                {   
                    location !== "productDescription" && 
                    <PTagStyle location={location} price={true} style={{marginTop: "0"}}> {currencies[currency]}{amount} </PTagStyle>
                }
                {attributes.map((attribute, i) =>
                    <div key={i} >
                        {location === "productDescription" && <PTagStyle attribute={true}>{attribute.name}:</PTagStyle>}
                        
                        <div style={{display: "flex", flexWrap:"wrap"}}>
                            { 
                                attribute.items.map((item, itemIndex) => 
                                <AttributesButton 
                                    stateAttributes={stateAttributes}
                                    key={itemIndex} 
                                    handleClick={this.handleClick} 
                                    attributeName= {attribute.name}
                                    attributeType= {attribute.type}
                                    displayValue={item.displayValue}
                                    location={location}
                            />
                            )}
                        </div>
                    </div>
                )}
                { location === "productDescription" && 
                    <>
                        <PTagStyle attribute={true} location={location} >PRICE:</PTagStyle>
                        <PTagStyle location={location} price={true} style={{marginTop: 0}}> {currencies[currency]}{amount} </PTagStyle>
                    </>
                }
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch) => ({
    setAttributesCount: (count) => dispatch(setAttributesCount(count))
});
const mapStateToProps = ({currency: {currency}, currencies:{currencies}})  => ({
    currency,
    currencies
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductInfo)

