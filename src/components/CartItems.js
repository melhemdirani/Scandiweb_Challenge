import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../Styles/CartItems.styles.css';
import { removeItem } from '../redux/cart/cart.action';
import { addItem } from '../redux/cart/cart.action';
import ProductInfo from './ProductInfo';
import plus from '../images/plus-square.svg';
import plusMini from '../images/plus-squaremini.svg';
import minus from '../images/minus-square.svg';
import minusMini from '../images/minus-squaremini.svg';

class CartItems extends Component {
    constructor(props){
        super(props);
        this.state={
            imageIndex: 0
        };
    }
    handlePreviousImage= () => {
        if(this.state.imageIndex === 0){
            return 
        }
        this.setState({imageIndex: this.state.imageIndex - 1})
    }
    handleNextImage= () => {
        let item = this.props.item

        if(this.state.imageIndex === item.data.gallery.length - 1){
            return 
        }
        this.setState({imageIndex: this.state.imageIndex + 1})
    }
    removeItemsFromCart = () => {
        let item = this.props.item
        this.props.removeItem({id: item.id,  quantity: item.quantity, attributes: item.attributes})
    }
    addItemsToCart = () => {
        let item = this.props.item
        this.props.addItem({id: item.id, attributes: item.attributes, attributesTypes: item.attributesTypes })
    }
    
    render() {

        const {currency, location, item, stateAttributes} = this.props
        let data = this.props.item.data
        let attributes = data.attributes

        return (
            <div className={location === "header" ? "CartItems_Container" : "CartItems_Container_CartPage"} >
                <ProductInfo 
                    brand={data.brand} 
                    name={data.name} 
                    amount={data.prices[currency].amount} 
                    attributes={attributes} 
                    stateAttributes={stateAttributes}
                    location={location}
                    quantity={item.quantity}
                />
                <div className="CartItems_Image_Container">
                    <div className="CartItems_Buttons_Container">
                        <img 
                            alt="plus" 
                            src={location === 'header' ? plusMini : plus} 
                            onClick={this.addItemsToCart} 
                            className="CartItems_Image"
                        />
                        <p className={location === "header" ? "CartItems_Amount_Small" : "CartItems_Amount_Large"}>
                            {item.quantity}
                        </p>
                        <img 
                            alt="minus" 
                            src={location === 'header' ? minusMini : minus} 
                            onClick={this.removeItemsFromCart}
                            className="CartItems_Image"
                        />
                    </div>
                    {
                        location === 'cartPage' &&  data.gallery.length > 1
                        ?   <div 
                                style={{backgroundImage: `url(${data.gallery[this.state.imageIndex]})`}} 
                                className="CartItems_CartPage_Images"
                            >
                                <p 
                                    onClick={this.handlePreviousImage} 
                                    className="CartItems_ImageToggler"
                                >
                                    {"<"}
                                </p>
                                <p 
                                    onClick={this.handleNextImage} 
                                    className="CartItems_ImageToggler"
                                >
                                    {">"}
                                </p>
                            </div>
                        :   <img 
                                src={data.gallery[0]} 
                                alt="" 
                                className={location === "header" ? "CartItems_Image_Header" : "CartItems_Image_Page"}
                            />
                    }
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    removeItem: (item) => dispatch(removeItem(item)),
    addItem: (item) => dispatch(addItem(item))
});

const mapStateToProps = ({currency: {currency}, currencies:{currencies}})  => ({
    currency,
    currencies
});

export default connect(mapStateToProps, mapDispatchToProps)(CartItems)

