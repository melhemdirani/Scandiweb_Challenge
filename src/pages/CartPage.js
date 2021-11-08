import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../Styles/CartPage.styles.css';
import CartItems from '../components/CartItems';
import { StyledComponentBrightness } from '../components/StyledComponents/StyledContainer.styles.jsx';
import { setCategoryIndex } from '../redux/category/category.action';

class CartPage extends Component {

    componentDidMount(){
        this.props.setCategoryIndex("")
    }
    render() {
        const { items, showCart} = this.props
        return (
            <StyledComponentBrightness  className="CartPage_Container" dark={showCart}>
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
    setCategoryIndex: (index) => dispatch(setCategoryIndex(index))
});
const mapStateToProps = ({items: {items},  showCart:{showCart}})  => ({
    items,
    showCart
});

export default connect(mapStateToProps, mapDispatchToProps)(CartPage)