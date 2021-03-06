// style selector bubble button

import React from 'react'

export default function Bubble (props) {

  const placeholder = 'https://www.texassampling.com/wp-content/uploads/2020/05/placeholder-product-image.jpg';

  return(
      <button className="bubble" aria-label="bubble" onClick={(e) => {
          props.ClickTracker(e)
          props.handleStyleChange(props.entity.style_id, e)
          }}>
        <img alt="style bubble" src={props.image || placeholder} loading='lazy'/>
      </button>
  )
}