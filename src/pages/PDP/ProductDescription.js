import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Parser from 'html-react-parser';

import ProductInfo from '../../components/ProductInfo';
import { StyledComponentBrightness } from '../../components/StyledComponents/StyledContainer.styles';
import { addItem, closeCart } from '../../redux/cart/cart.action';
import { hideCurrencies } from '../../redux/currency/currency.action';
import '../../Styles/ProductDescription.styles.css'


class ProductDescription extends Component {

    constructor(props){
        super(props);
        this.state={
            shownImageIndex: 0,
            attributesSelected: false,
            attribute: {},
            attributesTypes: []
        };
    }
    handleImageClick = (a) => {
        this.setState({shownImageIndex: a})
    }

    setAttribute = (type, att) => {
        if(!this.state.attribute.[type]){                               // To Check if the array already includes this type
            this.setState(prevState => ({
                attributesTypes: [...prevState.attributesTypes, type]
            }))
        }
        this.setState(prevState => ({                                   
            attribute: {                   
                ...prevState.attribute,   
                [type]: att       
            }
        }))
    }

    addToCart = () => {

        let attributesTypes= this.state.attributesTypes
        let {brand, name, inStock} = this.props.product
        if(!inStock) return alert(`${brand} ${name} is out of stock`)
        if(attributesTypes.length === this.props.attributesCount ) {     // Check if all attributes are selected
            let price = this.props.product.prices
            this.props.addItem({
                id: this.props.product.id, 
                price: price, 
                attributes: this.state.attribute, 
                attributesTypes:attributesTypes, 
                data: this.props.product
            })
            alert(`${brand} ${name} was added to cart`)
        } else {
            alert ("Please enter all product properties ")
        }
    }
    handleContainerClick = () => {
        this.props.showCart && this.props.closeCart()
        this.props.showCurrencies && this.props.hideCurrencies()
    }
    render() {
        const { currency, showCart} = this.props
        const { gallery, name, brand, prices, attributes, description } = this.props.product 

        return (
            <StyledComponentBrightness  
                dark={showCart}
                onClick={this.handleContainerClick} 
                className="PDP_Container"
            >
                <div className="PDP_SubContainer" >
                    <div className="PDP_Img_Container">
                        {gallery.length > 1 && gallery.map((image, i) => 
                            <img 
                                src={image} 
                                key={i} 
                                alt=""  
                                className="PDP_RenderedImages" 
                                onClick={() => this.handleImageClick(i)}
                            />
                        )} 
                    </div>
                    <img 
                        src={gallery[this.state.shownImageIndex]} 
                        alt="" 
                        className="PDP_Image"
                    />
                </div>
                <div>
                    <ProductInfo 
                        brand={brand} 
                        name={name} 
                        amount={prices[currency].amount} 
                        attributes={attributes} 
                        stateAttributes={this.state.attribute} 
                        setAttribute={this.setAttribute}  
                        location="productDescription"
                    />
                    <div className="PDP_Description">
                        {Parser(
                            `${description}`
                        )}
                    </div>
                    <button 
                        onClick={this.addToCart} 
                        className="addToCart_Button"
                    >
                        ADD TO CART
                    </button>
                </div>
            </StyledComponentBrightness> 
        )
    }
}
const mapDispatchToProps = (dispatch) => ({
    closeCart: () => dispatch(closeCart()),
    hideCurrencies: () => dispatch(hideCurrencies()),
    addItem: (item) => dispatch(addItem(item)),
});
  
const mapStateToProps =  ({ 
    showCart: {showCart}, 
    currency:{currency}, 
    attributesCount:{attributesCount}, 
    showCurrencies:{showCurrencies}
})  => ({
    currency,
    attributesCount,
    showCart,
    showCurrencies
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductDescription))
