import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { StyledLink } from './StyledComponents/StyledLink.styles';

const Categories = ({ name, categoryIndex, index }) => (
    <Link to={`/products/${name}`} >
        <StyledLink category={categoryIndex}  index={index}  >{name && name.toUpperCase() }</StyledLink>
    </Link>
)


const mapStateToProps = ({ categoryIndex: {categoryIndex} })  => ({
    categoryIndex
});

export default connect(mapStateToProps)(Categories);

