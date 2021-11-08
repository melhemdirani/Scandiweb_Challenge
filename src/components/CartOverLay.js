import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import '../Styles/CartOverLay.styles.css';
import CartItems from './CartItems';
import { toggleCart, setTotal } from '../redux/cart/cart.action';
import { StyledCartButton } from './StyledComponents/StyledCartButton.styles.jsx';

class CartOverLay extends Component {
    constructor(props){
        super(props);
        this.state={
           total: 0
        };
    }
    
    calculateTotal = () => {
        let NewTotal = this.props.items.reduce(
            (accumalatedPrice, item) =>accumalatedPrice + item.quantity*item.price[this.props.currency].amount, 0
        )
        let roundPrice = Math.round(NewTotal * 100) / 100;
        if(this.props.total !== roundPrice )  {
            this.props.setTotal(roundPrice)
        }
    }

    componentDidUpdate() {
        this.calculateTotal()       // calculate total when a new Item is added or removed
    }
    componentDidMount() {
        this.calculateTotal()       // calculate total when cart is rendered
    }
   
    
    render() {
        const {currencies, currency, toggleCart, items} = this.props
        return (
            <div className="CartOverLay_Container">
                <p className="CartOverLay_Title">My Bag, <span className="CartOverLay_SubTitle">{items.length} item{items.length !== 1  && <span>s</span>}</span> </p>
                <div className="CartOverLay_CartItems">
                    {items && items.map((item, index) => 
                        <CartItems 
                            key={index} 
                            item={item} 
                            location="header" 
                            stateAttributes={items[index].attributes}
                        />
                    )}
                </div>
                <div className="CartOverLay_SubContainer">
                        <div className="CartOverLay_Total">
                            <p className="CartOverLay_Total_Subtitle">Total</p>
                            <p className="CartOverLay_Total_Price">{currencies[currency]}{this.props.total}</p>
                        </div>
                        <div className="CartOverLay_Button_Container">
                            <Link to="/bag">
                                <StyledCartButton location="view bag" onClick={toggleCart}>VIEW BAG</StyledCartButton>
                            </Link>
                            <StyledCartButton >CHECK OUT</StyledCartButton>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    toggleCart: () => dispatch(toggleCart()),
    setTotal: (total) => dispatch(setTotal(total))
});

const mapStateToProps =  ({currency: {currency}, currencies:{currencies}, items:{items}, total:{total}})   => ({
    currency,
    currencies,
    items,
    total
});

export default connect(mapStateToProps, mapDispatchToProps)(CartOverLay)