// This is the Product Info Component

import React from 'react'

// styles
import style from './styles/productInfo.module.css';

import StyleSelector from './StyleSelector';


// test Data -  remove later
import {testProductStyles} from '../../../../config'

class ProductInfo extends React.Component{
  constructor(props){
    super()
    this.state= {
      forceUpdate: 0
    }
  }

  // query the api for the specific styles and pass that to style selector



  render(){
    return(
      <article className={style.ProductInfo}>
        { this.props.currentProduct ?
          <section>
            <div className={style.flexRow}>
              <h5>[Stars] *****</h5>
              <sub><a>Read All Reviews</a></sub>
            </div>
            <div>
              <h4>{this.props.currentProduct.category}</h4>
              <h2>{this.props.currentProduct.name}</h2>
              <h4>${this.props.currentProduct.default_price}</h4>
            </div>
            <StyleSelector
              currentProduct={this.props.currentProduct}
              styles={testProductStyles}
            />
          </section>
          :
          null
        }
      </article>
    )
  }
}

export default ProductInfo;