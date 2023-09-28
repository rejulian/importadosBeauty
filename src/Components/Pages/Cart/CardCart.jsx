import React from 'react'
import './Cart.css'

const CardCart = ({ product }) => {
    const { image, title, quantity, unit_price } = product
    return (
        <div className='card-cart'>
            <img src={image} alt="Victoria's Secret Product" />
            <div>
                <h3>{title}</h3>
                <h4>Cantidad: {quantity}</h4>
                <h4>${unit_price}</h4>
            </div>
            
        </div>
    )
}

export default CardCart