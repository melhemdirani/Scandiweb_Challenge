import React, { Component } from 'react'
import { Route, Switch , Redirect} from "react-router-dom";
import { gql }  from 'apollo-boost';
import { connect } from 'react-redux';

import './App.css';
import ProductDescription from './pages/ProductDescription';
import ProductListing from './pages/ProductListing';
import Header from './components/Header';
import CartPage from './pages/CartPage';
import { setStoreItems } from './redux/storeItems/storeItems.action';
import { StyledContainer } from './components/StyledComponents/StyledContainer.styles.jsx';

class App extends Component {
  constructor(){
    super();
    this.state={
      category: "",
      currency: "",
      cartOverlay: false,
      loading: true,
      dark: false
    };
  }
  componentDidMount(){
    if(this.state.loading){
      this.props.client.query({
        query:  gql `
          {
            categories{
              name
              products{
                category
                name
                description
                gallery
                prices{
                  currency
                  amount
                } 
                brand
                attributes{
                  name
                  type
                  items{
                    displayValue
                    value
                  }
                }
              }
            }
          }
        `
      }).then(res => this.props.setStoreItems(res));   // add Store Items to redux
    } 
  }
  componentDidUpdate(){
    if(!this.props.storeItems.loading && this.state.loading){
      this.setState({loading: false})
    }
  }
  render() {
    return this.state.loading ? "loading" : (
      <StyledContainer dark={this.props.showCart} >
        <Header />
        <Switch>
          <Route exact path='/tech'>
            <ProductListing productCategory={1}/>
          </Route>
          <Route exact path='/'>
            <Redirect to="/clothes" />
          </Route>
          <Route exact path='/clothes'>
            <ProductListing productCategory={0} />
          </Route>
          <Route  exact path='/:category/:product'>
            <ProductDescription />
          </Route>
          <Route  exact path='/bag'>
            <CartPage />
          </Route>
          <p>not found</p>
        </Switch>
      </StyledContainer>
    )
  }
}

const mapStateToProps = ({storeItems:{storeItems}, showCart:{showCart}})  => ({
  storeItems,
  showCart
});

const mapDispatchToProps = (dispatch) => ({
  setStoreItems: (items) => dispatch(setStoreItems(items)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
