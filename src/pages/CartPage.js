import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../Styles/CartPage.styles.css';
import CartItems from '../components/CartItems';
import { StyledComponentBrightness } from '../components/StyledComponents/StyledContainer.styles.jsx';
import { setCategoryIndex } from '../redux/category/category.action';
import { closeCart } from '../redux/cart/cart.action';
import { hideCurrencies } from '../redux/currency/currency.action';

class CartPage extends Component {
    handleContainerClick = () => {
        this.props.showCart && this.props.closeCart()
        this.props.showCurrencies && this.props.hideCurrencies()
      }
    componentDidMount(){
        this.props.setCategoryIndex("")
    }
    render() {
        const { items, showCart} = this.props
        return (
            <StyledComponentBrightness  
                className="CartPage_Container" 
                dark={showCart} 
                onClick={this.handleContainerClick}
            >
                <h1>Cart</h1>
                {items && items.map((item, i) => 
                    <CartItems 
                        key={i} 
                        item={item}
                        stateAttributes={items[i].attributes} 
                        location="cartPage"
                    />
                )}
            </StyledComponentBrightness>
        )
    }
}


const mapDispatchToProps = (dispatch) => ({
    setCategoryIndex: (index) => dispatch(setCategoryIndex(index)),
    closeCart: () => dispatch(closeCart()),
    hideCurrencies: () => dispatch(hideCurrencies())
});

const mapStateToProps = ({items: {items},  showCart:{showCart}, showCurrencies:{showCurrencies}})  => ({
    items,
    showCart,
    showCurrencies
});

export default connect(mapStateToProps, mapDispatchToProps)(CartPage)