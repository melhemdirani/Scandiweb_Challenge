import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gql }  from 'apollo-boost';

import '../Styles/Header.styles.css'
import brandIcon from '../images/brandIcon.svg';
import cart from '../images/emptyCart.svg';
import vector from '../images/vector.svg';
import Categories from './Categories';
import { hideCurrencies, setCurrency, toggleCurrencies } from '../redux/currency/currency.action';
import { toggleCart, closeCart, setTotalQuantity } from '../redux/cart/cart.action';
import CartOverLay from './CartOverLay';
import { showAttribute } from '../redux/attributes/attributes.action';



class Header extends Component {
    constructor({props}){
        super(props);
        this.state={
            data: {},
            fetchedCurrencies: {}
        };
    }
    toggleCurrencies = () => {
        this.props.closeCart()
        this.props.toggleCurrencies()
    }

    handleCurrencyClick = (c) => {
        this.props.setCurrency(c);
    }

    openCloseCart = () => {
        this.props.toggleCart()
    } 
    handleContainerClick= () => {
        this.props.attributeShown && this.props.showAttribute("")
        this.props.showCurrencies && this.props.hideCurrencies()
    }
    componentDidMount(){
        this.calculateQuantity();
        this.props.client.query({
            query:  gql `
              {
                categories{
                    name
                }
              }
            `
        }).then(res => { this.setState({data: res.data}) });  
        this.props.client.query({
            query:  gql `
              {
               currencies
              }
            `
        }).then(res => { this.setState({fetchedCurrencies: res.data}) }); 
    } 
    
    calculateQuantity = () => {
        let newQuantity = this.props.items.reduce(
            (accumalatedQuantity, item) =>accumalatedQuantity + item.quantity, 0
        )
        if(this.props.totalQuantity !== newQuantity )  {
            this.props.setTotalQuantity(newQuantity)
        }
    }

    componentDidUpdate() {
        this.calculateQuantity();
    }

    render() {
        
        const { currency, showCart, totalQuantity, showCurrencies, toggleCart, currencies} = this.props
        const data = this.state.data
        const fetchedCurrencies = this.state.fetchedCurrencies.currencies
        
        return  (
            <div className="Header_Container" onClick={this.handleContainerClick}>
                <div className="flex">
                    {data.categories && data.categories.map((category, index) =>
                        <Categories key={index} name={category.name} index={index}/>
                     )}
                </div>
                <img alt="brand icon" src={brandIcon} />
                <div>
                    <div className="flex">
                        <p className="header_currency" onClick={this.toggleCurrencies}>{currencies[currency]}</p>
                        <img 
                            alt="" 
                            src={vector} 
                            className={showCurrencies ? "currency_vector" : "currency_vector  currency_vector_rotate"} 
                            onClick={this.toggleCurrencies}
                        />
                        <div className="header_cartIcon_container" onClick={toggleCart}>
                            <img alt="" src={cart} />
                            <p className="header_quantity">{totalQuantity}</p>
                        </div>
                    </div>
                    { showCurrencies && 
                        <div className="currency_options boxShadow">
                            {fetchedCurrencies  && fetchedCurrencies.map((d,i) =>
                                <p 
                                    key={i} 
                                    onClick={() => this.handleCurrencyClick(i)} 
                                    className="header_currency_options"
                                >
                                    {currencies[i]} {d}
                                </p>
                            )}
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
    toggleCurrencies: () => dispatch(toggleCurrencies()),
    hideCurrencies: () => dispatch(hideCurrencies()),
    closeCart: () => dispatch(closeCart()),
    showAttribute: (id) => dispatch(showAttribute(id)),
    setTotalQuantity: (total) => dispatch(setTotalQuantity(total)),
});

  
const mapStateToProps = ({
    currency:{currency}, 
    currencies:{currencies}, 
    showCart:{showCart},
    showCurrencies:{showCurrencies},
    totalQuantity:{totalQuantity},
    attributeShown:{attributeShown},
    items: {items}

    })  => ({
    currency,
    currencies,
    showCart,
    showCurrencies,
    totalQuantity,
    attributeShown,
    items

});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
