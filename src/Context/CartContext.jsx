import React, { createContext, useState } from 'react'

export const CartContext = createContext()

const CartContextComponent = ({ children }) => {

    const [cart, setCart] = useState( JSON.parse(localStorage.getItem('cart')) || []);

    const addToCart = (product) => {
        const isInCart = cart.some(item => item.id === product.id)
        if (isInCart) {
            //cambiar la cantidad
            const newArray = cart.map(e => {
                if (e.id === product.id) {
                    //modifico el elemento y lo agrego al nuevo arreglo
                    return { ...e, quantity: e.quantity + product.quantity }
                } else {
                    return e
                }
            })
            localStorage.setItem('cart', JSON.stringify(newArray))
            setCart(newArray)
        } else {
            localStorage.setItem('cart', JSON.stringify([...cart, product]))
            setCart([...cart, product])
        }
    }

    const clearCart = () => {
        setCart([])
        localStorage.removeItem('cart')
    }

    const deleteById = (id) => {
        const newArray = cart.filter(item => item.id !== id)
        localStorage.setItem('cart', JSON.stringify(newArray))
        setCart(newArray)
    }

    const data = {
        cart,
        setCart,
        addToCart,
        clearCart,
        deleteById
    }

    return (
        <CartContext.Provider value={data}>
            {children}
        </CartContext.Provider>
    )

}

export default CartContextComponent;
