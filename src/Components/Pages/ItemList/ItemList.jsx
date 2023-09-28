import React from 'react'
import { Link } from 'react-router-dom';
import './ItemList.css'

const ItemList = ({ product }) => {

    const { image, title, unit_price, id } = product;

    return (
        <Link className='card-container' to={`/product/${id}`}>
            <img src={image} alt="Importados Beauty Product Image" />
            <div className='card-text'>
                <h4>${unit_price}</h4>
                <p>{title}</p>
            </div>
        </Link>
    )
}

export default ItemList