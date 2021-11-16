import React, { Component } from 'react'
import { Route, Switch , Redirect} from "react-router-dom";
import { connect } from 'react-redux';

import './App.css';
import Header from './components/Header';
import CartPage from './pages/CartPage';
import PLP_CONTAINER from './pages/PLP/PLP_CONTAINER';
import PDP_CONTAINER from './pages/PDP/PDP_CONTAINER';

class App extends Component {
 
 
  render() {
    return(
      <div className={this.props.showCart ? "DarkApp" : "App"} >
        <Header client={this.props.client}/>
        <Switch>
          <Route exact path='/products/:category'>
            <PLP_CONTAINER />
          </Route>
          <Route exact path='/'>
            <Redirect to="/products/clothes" />
          </Route>
          <Route  exact path='/products/:category/:product'>
            <PDP_CONTAINER />
          </Route>
          <Route  exact path='/bag'>
            <CartPage />
          </Route>
          <p>not found</p>
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = ({showCart:{showCart}})  => ({
  showCart
});


export default connect(mapStateToProps)(App);
