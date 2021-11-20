import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import '../Styles/ProductCard.styles.css'
import shopCart from '../images/shopCart.svg'
import AttributesOptions from './AttributesOptions';
import { addItem, setAttributesCount } from '../redux/cart/cart.action';
import { showAttribute, allowHideAttributes, disallowHideAttributes} from '../redux/attributes/attributes.action';

class ProductCard extends Component {
    constructor(props){
        super(props);
        this.state={
            isCardSelected: false,
            attributesSelected: false,
            attribute: {},
            attributesTypes: []
        };
    }

    mouseEnter = () => {
        !this.props.showCart && this.setState({isCardSelected: true});
        this.props.allowHideAttribute && this.props.disallowHideAttributes();
    }
    mouseLeave = () => {
        this.setState({isCardSelected: false});
        this.props.attributeShown && !this.props.allowHideAttribute && this.props.allowHideAttributes();

    }
    HandleCartIconClick = () => {
        if(!this.props.inStock) {
            return alert(`${this.props.brand} ${this.props.name} is out of stock`)
        }
        if(!this.props.attributes.length){
            let attributesTypes= this.state.attributesTypes
            let price = this.props.price
            
            return  this.props.addItem({
                id: this.props.product.id, 
                price: price, 
                attributes: this.state.attribute, 
                attributesTypes:attributesTypes, 
                data: this.props.product
            })
            
        }
        this.props.showAttribute(this.props.id)

    }
    setAttribute = (type, att) => {
        
        if(!this.state.attribute.[type]){                               
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
        let {brand, name, inStock} = this.props
        if(!inStock){ 
            alert(`${brand} ${name} is out of stock`)
        } else if(attributesTypes.length === this.props.attributes.length ) {     
            let price = this.props.price
            this.props.addItem({
                id: this.props.product.id, 
                price: price, 
                attributes: this.state.attribute, 
                attributesTypes:attributesTypes, 
                data: this.props.product
            })
        } else {
            alert ("Please enter all product properties")
            this.props.disallowHideAttributes()
        }
    }

    render() {
        let category = this.props.categoryIndex === 0 ? 'clothes' : 'tech'
        const {image, brand, price, currency, currencies, id, name, inStock, attributes, attributeShown, showCart} = this.props
        const {isCardSelected } = this.state
        return (
            <div onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} >
                { attributeShown === id && attributes.length
                    ?   <div 
                            className={ isCardSelected 
                                            ? "cardContainer_attributes boxShadow" 
                                            : "cardContainer_attributes" 
                                        } 
                        >
                            <p>Please select item options for {name}:</p>
                            <AttributesOptions 
                                location="Product_Listing"
                                attributes={attributes}
                                handleClick={this.setAttribute}
                                stateAttributes={this.state.attribute} 
                                className="ProductCard_AttributesOptions"
                            />
                            <button 
                                onClick={this.addToCart} 
                                className="ProductCard_addToCart"
                            >
                                ADD TO CART
                            </button>
                        </div>
                    :   <div className={ isCardSelected ? "cardContainer boxShadow" : "cardContainer" } >
                            <Link to = {`/products/${category}/${id}`} className={showCart ? "disabled_link" : ""}>
                                { !inStock && <p className="ProductCard_OutofStock"> OUT OF STOCK </p>}
                                <img alt={name} src={image} className="productImage"/>
                                <div>
                                    <div className="itemInfo" >
                                        <p>{brand} {name}</p>
                                        <p>{currencies[currency]}{price[0].amount}</p>
                                    </div>
                                </div>
                            </Link>
                            {isCardSelected && 
                                <img 
                                    alt="" 
                                    src={shopCart} 
                                    className="shopCartIcon"  
                                    onClick={this.HandleCartIconClick}/
                                >
                            }
                        </div>
                }
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    addItem: (item) => dispatch(addItem(item)),
    setAttributesCount: (count) => dispatch(setAttributesCount(count)),
    showAttribute: (id) => dispatch(showAttribute(id)),
    allowHideAttributes: () => dispatch(allowHideAttributes()),
    disallowHideAttributes: () => dispatch(disallowHideAttributes())
});

const mapStateToProps =  ({
        currency: {currency}, 
        attributesCount:{attributesCount}, 
        currencies:{currencies}, 
        attributeShown:{attributeShown},
        allowHideAttribute: {allowHideAttribute},
        showCart: {showCart}    

    })   => ({
    currency,
    showCart,
    attributesCount, 
    currencies,
    attributeShown,
    allowHideAttribute
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);