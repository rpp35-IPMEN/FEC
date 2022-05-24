// this is the order form used to add things to the card

import React from 'react';
import {useState} from 'react';
import {Star, Plus} from 'akar-icons';
import sendRequest from '../../../../server/lib/sendRequest';

const OrderForm = (props) => {

  // sku ID for submission
  const [sku, setSku] = useState(null);
  // max availible  - for verification
  const [quantityLimiter, setQuantityLimiter] = useState(null);
  // quntity user picks
  const [quantity, setQuantity] = useState(null);
  // drop down options
  const [ quantityOptions, setQuantityOptions ] = useState([<option>1</option>])
  // form error status
  const [error, setError] = useState(null)


  // create drop down sizing options
  const createOptions = () => {
    let options = [];

    for(let item in props.inventory){
      const opt = < option key={item} value={item} >{props.inventory[item].size}</option>
      options.push(opt)
    }

    return options
  }

  // create quantity options and set the limitor when a SKU is set
  const createInventory = (id) => {

    const itemInfo = props.inventory[id];

    const opts = []
    if(itemInfo.quantity < 1){
      opts.push(<option value="null">OUT OF STOCK</option>)
    } else {
      for(let i = 1; i < itemInfo.quantity; i++){
        opts.push(<option key={i} value={i}>{i}</option>)
      }
    }
    setQuantityOptions(opts);
    setQuantityLimiter(props.inventory[id].quantity)
    setQuantity(1);
  }

  // user state change size
  const handleSizeChange = (e) => {
    setSku(e.target.value);
    createInventory(e.target.value);
  }

  // user state change qunatity
  const handleQuantityChange = (e) => {
    setQuantity(e.target.value)
  }

  // user submit event
  const handleSubmit = (e) => {
    e.preventDefault();
    if(verifyUserInput()){
      const formData = {'sku_id': sku}
      const path='cart'
      sendRequest(path, 'POST', formData);
    }
  }

  // user favorited event
  const handleFavorite = (e) => {

  }

  // make sure user has filled in some data with not impossible values
  // return true/false
  const verifyUserInput = () => {
    // check quantity
    if(quantity > quantityLimiter){
      setError("We don'thave enough stock for that, try fewer items")
      return false
    }
    // check size
    if(!sku){
      setError("Please select a size")
      return false
    }

    return true
  }

  return(
    <form className="OrderForm">
       {error? <span className="form-error">{error}</span> : null}
      <div className="flexRow input-group">
        <select className="dropdown" onChange={(e) => handleSizeChange(e)}>
          <option>Select Size</option>
          {
            createOptions()
          }
        </select>
        <select className="dropdown" onChange={(e) => handleQuantityChange(e)}>
          {
            quantityOptions || null
          }
        </select>
      </div>
      <div className="flexRow input-group">
        { quantityLimiter !== 0 ?
          <button onClick={(e) => handleSubmit(e)} className="flexRow order-submit-button"><span>ADD TO BAG</span> <Plus size="16" /></button>
          :
          null
        }
        <button className="order-favorite-button">
          <Star size={32} />
        </button>
      </div>
    </form>
  )

}

export default OrderForm;