import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setAttributesCount } from '../redux/cart/cart.action';
import '../Styles/ProductInfo.styles.css'
import AttributesOptions from './AttributesOptions';
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
        const {brand, name, amount, currencies, currency, attributes, location, stateAttributes, showCart} = this.props
        return (
            <div className="ProductInfo_Container"  >
                <PTagStyle location={location} subTitle={true} > 
                    {brand} 
                </PTagStyle>
                <PTagStyle location={location} >{name}</PTagStyle>
                {   
                    location !== "productDescription" && 
                        <PTagStyle location={location} price={true}> 
                    {currencies[currency]}{amount} 
                    </PTagStyle>
                }
                <AttributesOptions 
                    location={location} 
                    stateAttributes={stateAttributes} 
                    attributes={attributes} 
                    handleClick={this.handleClick}
                    showCart={showCart}
                />
                { location === "productDescription" && 
                    <>
                        <PTagStyle 
                            attribute={true} 
                            location={location}
                        >
                            PRICE:
                        </PTagStyle>
                        <PTagStyle 
                            location={location} 
                            price={true}
                            className="ProductInfo_MarginTop"
                        > 
                            {currencies[currency]}{amount} 
                        </PTagStyle>
                    </>
                }
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch) => ({
    setAttributesCount: (count) => dispatch(setAttributesCount(count))
});
const mapStateToProps = ({currency: {currency}, currencies:{currencies}, showCart:{showCart}})  => ({
    currency,
    currencies,
    showCart
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductInfo)

