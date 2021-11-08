import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import ProductInfo from '../components/ProductInfo';
import { StyledComponentBrightness } from '../components/StyledComponents/StyledContainer.styles';
import { addItem, closeCart } from '../redux/cart/cart.action';
import { setCategoryIndex } from '../redux/category/category.action';
import '../Styles/ProductDescription.styles.css'


class ProductDescription extends Component {

    constructor(props){
        super(props);
        this.state={
            shownImageIndex: 0,
            attributesSelected: false,
            attribute: {},
            attributesTypes: []
        };
    }
    handleImageClick = (a) => {
        this.setState({shownImageIndex: a})
    }
    componentDidMount(){
        let i = this.props.match.params.category === "clothes" ? 0 : 1
        this.props.setCategoryIndex(i)
    }
    setAttribute = (type, att) => {

        if(!this.state.attribute.[type]){                               // To Check if the array already includes this type
            this.setState(prevState => ({
                attributesTypes: [...prevState.attributesTypes, type]
            }))
        }
        
        this.setState(prevState => ({                                   
            attribute: {                   
                ...prevState.attribute,   
                [type]: att       
            }
        }))
        
    }

    addToCart = () => {

        let i = this.props.match.params.category === "clothes" ? 0 : 1
        let j =  this.props.match.params.product
        let data = this.props.storeItems.data.categories[i].products[j]
        let attributesTypes= this.state.attributesTypes

        if(attributesTypes.length === this.props.attributesCount ) {     // Check if all attributes are selected
            let price = this.props.storeItems.data.categories[i].products[j].prices
            this.props.addItem({array:[i, j], price: price, attributes: this.state.attribute, attributesTypes:attributesTypes, data: data})
        } else {
            alert ("Please enter all product properties ")
        }
    }
    render() {
        const { category, closeCart, currency, showCart} = this.props
        const data = this.props.storeItems.data
        let i = this.props.match.params.category === "clothes" ? 0 : 1
        const product = this.props.match.params.product
        const products = data.categories[i].products[product]
        const { gallery, name, brand, prices, description, attributes } = products 

        return (
            <StyledComponentBrightness  dark={showCart} onClick={closeCart} className="PDP_Container">
                <div className="PDP_Img_Container" >
                    {gallery.length > 1 && gallery.map((image, i) => 
                    <img src={image} key={i} alt=""  className="PDP_RenderedImages" onClick={() => this.handleImageClick(i)}/>)} 
                </div>
                <img src={gallery[this.state.shownImageIndex]} alt="" className="PDP_Image"/>
                <div>
                    <ProductInfo 
                        brand={brand} 
                        name={name} 
                        amount={prices[currency].amount} 
                        attributes={attributes} 
                        category={category}
                        product={product}
                        stateAttributes={this.state.attribute} 
                        setAttribute={this.setAttribute}  
                        location="productDescription"
                    />
                    <button onClick={this.addToCart} className="PDP_BUTTON">ADD TO CART</button>
                    <div dangerouslySetInnerHTML={{__html: description}} />
                </div>
            </StyledComponentBrightness>
        )
    }
}
const mapDispatchToProps = (dispatch) => ({
    closeCart: () => dispatch(closeCart()),
    addItem: (item) => dispatch(addItem(item)),
    setCategoryIndex: (index) => dispatch(setCategoryIndex(index))

});
  
const mapStateToProps =  ({ showCart: {showCart}, category:{category}, currency:{currency}, attributesCount:{attributesCount}, storeItems:{storeItems}})   => ({
    currency,
    attributesCount,
    storeItems,
    showCart,
    category
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductDescription))
