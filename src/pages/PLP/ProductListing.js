import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProductCard from '../../components/ProductCard'
import '../../Styles/ProductListing.styles.css'
import { closeCart } from '../../redux/cart/cart.action';
import { hideCurrencies } from '../../redux/currency/currency.action';
import { StyledComponentBrightness } from '../../components/StyledComponents/StyledContainer.styles';
import { showAttribute } from '../../redux/attributes/attributes.action';
import { setCategoryIndex } from '../../redux/category/category.action';

class ProductListing extends Component {

  handleContainerClick = () => {
    this.props.showCart && this.props.closeCart();
    this.props.showCurrencies && this.props.hideCurrencies();
    this.props.attributeShown && this.props.allowHideAttribute && this.props.showAttribute("");
  }
  setCategory = () => {
    let index = this.props.data.name === "clothes" ? 0 : this.props.data.name === "tech" ? 1 : 3
    this.props.setCategoryIndex(index)
  }
  componentDidMount() {
    this.setCategory()
  }
  componentDidUpdate() {
    this.setCategory()
  }
  render() {
    const { showCart, data } = this.props
    return  (
      <StyledComponentBrightness 
        dark={showCart} 
        className="productListing_container" 
        onClick={this.handleContainerClick} 
      >
        <div>
          <h1> 
            {data && (data.name.charAt(0).toUpperCase() + data.name.slice(1))}
          </h1>
        </div>
        <div className="productlisting">
          {data && data.products.map((product, index) => ( 
            <ProductCard 
              index={index} 
              key={product.id} 
              id={product.id}
              image={product.gallery[0]} 
              brand={product.brand} 
              name={product.name} 
              price={product.prices}
              inStock={product.inStock} 
              attributes={product.attributes}
              product={product}
            />
          ))}
        </div>
      </StyledComponentBrightness>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  closeCart: () => dispatch(closeCart()),
  hideCurrencies: () => dispatch(hideCurrencies()),
  showAttribute: (id) => dispatch(showAttribute(id)),
  setCategoryIndex: (index) => dispatch(setCategoryIndex(index))
});

const mapStateToProps = ({ 
    showCart: {showCart}, 
    showCurrencies:{showCurrencies}, 
    attributeShown:{attributeShown},
    allowHideAttribute:{allowHideAttribute},
    categoryIndex: {categoryIndex}
  })  => ({
  showCart,
  showCurrencies,
  attributeShown,
  allowHideAttribute,
  categoryIndex
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductListing);