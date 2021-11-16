import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router';

import ProductListing from './ProductListing';

const Get_Collection_By_Category = gql `

query category($input: CategoryInput){
    category(input: $input){
      name
      products{
        id
        brand
        name
        inStock
        gallery
        attributes{
          name
          type
          items{
              displayValue
              value
          }
      }
        prices{
          amount
        }
      }
    }
}
`
const PLP_CONTAINER = (props) => {

  let variable = props.match.params.category
  return (
    <Query query={Get_Collection_By_Category} variables={{input: {title: variable}}}>
      { 
        ({ loading, data }) => {
                if(loading) return <p>loading</p>
                return <ProductListing data={data.category} />
            }
      }
    </Query>
  )
}

export default withRouter(PLP_CONTAINER)
