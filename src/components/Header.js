import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../Styles/Header.styles.css'
import brandIcon from '../images/brandIcon.svg';
import cart from '../images/emptyCart.svg';
import vector from '../images/vector.svg';
import Categories from './Categories';
import { setCurrency } from '../redux/currency/currency.action';
import { toggleCart, closeCart } from '../redux/cart/cart.action';
import CartOverLay from './CartOverLay';



class Header extends Component {
    constructor({props}){
        super(props);
        this.state={
            currencyShown: false
        };
    }
    toggleCurrencies = () => {
        this.setState({currencyShown: !this.state.currencyShown});
        this.props.closeCart()
    }

    handleCurrencyClick = (c) => {
        this.props.setCurrency(c);
        this.setState({currencyShown: false})
    }

    openCloseCart = () => {
        this.setState({currencyShown: false})
        this.props.toggleCart()
    }   
    
    render() {
        
        const { currency, currencies, showCart, items, storeItems} = this.props
        const { currencyShown } = this.state
        const { data } = storeItems

        return  (
            <div className="Header_Container" >
                <div className="flex">
                    {data.categories.map((category, index) => <Categories key={index} name={category.name} index={index}/>)}
                </div>
                <img alt="brand icon" src={brandIcon} />
                <div>
                    <div className="flex">
                        <p className="header_currency" onClick={this.toggleCurrencies}>{currencies[currency]}</p>
                        <img alt="" src={vector} className="currency_vector" onClick={this.toggleCurrencies}/>
                        <div className="header_cartIcon_container" onClick={this.openCloseCart}>
                            <img alt="" src={cart} />
                            <p className="header_quantity">{items.length}</p>
                        </div>
                    </div>
                    { currencyShown && 
                        <div className="currency_options boxShadow">
                            {data.categories[0].products[0].prices.map((d,i) =>
                            <p key={i} onClick={() => this.handleCurrencyClick(i)} className="header_currency_options">{currencies[i]} {d.currency}</p>)}
                        </div>
                    }
                </div> 
                 {showCart && <CartOverLay/>}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    setCurrency: (currency) => dispatch(setCurrency(currency)),
    toggleCart: () => dispatch(toggleCart()),
    closeCart: () => dispatch(closeCart())
});

  
const mapStateToProps = ({
    currency:{currency}, 
    currencies:{currencies}, 
    showCart:{showCart},
    storeItems:{storeItems},
    items:{items},

    })  => ({
    currency,
    currencies,
    showCart,
    storeItems,
    items
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
