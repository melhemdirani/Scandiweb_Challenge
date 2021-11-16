import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router';

import ProductDescription from './ProductDescription';

const GET_PRODUCT_BY_ID = gql `

query product($id: String!){
    product(id: $id){
        id
        name
        brand
        description
        inStock
        attributes{
            name
            type
            items{
              displayValue
              value
            }
        }
        gallery
        prices{ 
          amount
        }
    }
}
`
const PDP_CONTAINER = (props) => {

  let id = props.match.params.product
  return (
    <Query query={GET_PRODUCT_BY_ID} variables={{id: id}}>
      { 
        ({ loading, data }) => {
          if(loading) return <p>loading</p>
          return <ProductDescription product={data.product} />
        }
      }
    </Query>
  )
}

export default withRouter(PDP_CONTAINER)
