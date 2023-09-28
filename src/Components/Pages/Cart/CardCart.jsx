import React, { useContext } from 'react'
import './Cart.css'
import { CartContext } from '../../../Context/CartContext';

const CardCart = ({ product }) => {
    const { image, title, quantity, unit_price, id } = product;
    const {deleteById} = useContext(CartContext)
    return (
        <div className='card-cart'>
            <img src={image} alt="Victoria's Secret Product" />
            <div className='card-cart-information'>
                <h3>{title}</h3>
                <h4>Cantidad: {quantity}</h4>
                <h4>${unit_price}</h4>
                <button className='cart-delete-byId' onClick={()=>deleteById(id)}>Eliminar</button>
            </div>
            
        </div>
    )
}

export default CardCart