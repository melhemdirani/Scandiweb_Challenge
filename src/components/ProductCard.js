import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import '../Styles/ProductCard.styles.css'
import shopCart from '../images/shopCart.svg'
import { setProduct } from '../redux/category/category.action';


class ProductCard extends Component {
    constructor(props){
        super(props);
        this.state={
            isCardSelected: false
        };
    }
    mouseEnter = () => {
        this.setState({isCardSelected: true})
    }
    mouseLeave = () => {
        this.setState({isCardSelected: false})
    }
    handleClick = () => {
        this.props.setProduct(this.props.index)
    }
   

    render() {
        let category = this.props.categoryIndex === 0 ? 'clothes' : 'tech'
        const {image, name, price, currency, currencies, index} = this.props
        const {isCardSelected} = this.state
        return (
            <Link
                to = {`/${category}/${index}`}
                className={isCardSelected ? "cardContainer boxShadow" : "cardContainer" } 
                onMouseEnter={this.mouseEnter} 
                onMouseLeave={this.mouseLeave}
                onClick={this.handleClick}
            >
                <div>
                    <img alt={name} src={image} className="productImage"/>
                    <div className="itemInfo" >
                        <p>{name}</p>
                        <p>{currencies[currency]}{price[currency].amount}</p>
                    </div>

                </div>
                {isCardSelected && <img alt="" src={shopCart} className="shopCartIcon" />}

            </Link>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    setProduct: (product) => dispatch(setProduct(product))
});

const mapStateToProps =  ({currency: {currency}, currencies:{currencies}, category:{category}, product:{product}})   => ({
    currency,
    category,
    product,
    currencies
});

export default connect(mapStateToProps,  mapDispatchToProps)(ProductCard);