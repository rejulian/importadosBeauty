import React, { useContext, useState } from 'react'
import './Cart.css'
import { CartContext } from '../../../Context/CartContext'
import { Button } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CardCart from './CardCart'
import { Link, useNavigate } from 'react-router-dom'

const Cart = () => {

    const navigate = useNavigate()
    const { cart, clearCart, deleteById } = useContext(CartContext)

    const handleFinish = () => {
        navigate('/checkout')
    }

    return (
        <main>
            <section id='cart'>
                {cart.length > 0
                    ? (
                        <div className='cart-box'>
                            <DeleteForeverIcon className='btn-delete' variant='outlined' onClick={clearCart}>Eliminar Carrito</DeleteForeverIcon>
                            <div className='cart-container'>
                                {
                                    cart.map(product => (
                                        <CardCart key={product.id} product={product} />
                                    ))
                                }
                            </div>
                            <Button onClick={handleFinish} variant='contained'>Finalizar compra</Button>
                        </div>
                    ) : (
                        <div className='empty-cart'>
                            <p>Tu carrito está vacío</p>
                            <Link className='btn' to='/shop'>Ir de compras</Link>
                        </div>
                    )
                }
            </section>
        </main>
    )
}

export default Cart