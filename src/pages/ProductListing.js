import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProductCard from '../components/ProductCard'
import '../Styles/ProductListing.styles.css'
import { closeCart } from '../redux/cart/cart.action';
import { StyledComponentBrightness } from '../components/StyledComponents/StyledContainer.styles';
import { setCategory, setCategoryIndex } from '../redux/category/category.action';


class ProductListing extends Component {

  componentDidMount(){
    this.props.setCategoryIndex(this.props.productCategory)
  }
  
  render() {

    let i = this.props.productCategory ? this.props.productCategory : 0
    const data = this.props.storeItems.data
    let products =  data.categories[i].products
    let name = data.categories[i].name
    const { closeCart, showCart } = this.props
    return  (
      <StyledComponentBrightness dark={showCart} className="productListing_container" onClick={closeCart} >
        <h1> {name.charAt(0).toUpperCase() + name.slice(1)}</h1>
        <div className="productlisting">
          {products && products.map((product, index) => (
            <ProductCard 
              index={index} 
              categoryIndex={i}
              key={index} 
              image={product.gallery[0]} 
              name={product.name} 
              brand={product.brand}
              price={product.prices} 
              currency={product.prices[0].currency}
            />
          ))}
        </div>
      </StyledComponentBrightness>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  closeCart: () => dispatch(closeCart()),
  setCategory: (category) => dispatch(setCategory(category)),
  setCategoryIndex: (index) => dispatch(setCategoryIndex(index)),

});

const mapStateToProps = ({ storeItems: {storeItems}, showCart: {showCart}})  => ({
  storeItems, 
  showCart
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductListing);