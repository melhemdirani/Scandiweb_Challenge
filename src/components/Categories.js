import React, { Component } from 'react';
import { setCategoryIndex } from '../redux/category/category.action';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { StyledLink } from './StyledComponents/StyledLink.styles';

class Categories extends Component {
   
    handleClick = () => {
        this.props.setCategoryIndex(this.props.index);
    }

    render() {
        const { name, categoryIndex, index } = this.props
        return (
            <Link to={`/${name}`} >
                <StyledLink category={categoryIndex} index={index} onClick={this.handleClick} >{name && name.toUpperCase() }</StyledLink>
            </Link>
        )
    }
   
}


const mapDispatchToProps = (dispatch) => ({
    setCategoryIndex: (index) => dispatch(setCategoryIndex(index))
});
const mapStateToProps = ({ categoryIndex: {categoryIndex} })  => ({
    categoryIndex
});

export default withRouter(connect(mapStateToProps,  mapDispatchToProps)(Categories));

