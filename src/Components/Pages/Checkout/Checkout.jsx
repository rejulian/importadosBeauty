import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../../Context/CartContext'
import { ClipLoader } from 'react-spinners';
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react"
import Axios from 'axios'
import { AuthContext } from '../../../Context/AuthContext';
import { useLocation } from 'react-router-dom';
import { db } from '../../../firebaseConfig'
import { addDoc, collection, doc, updateDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { Button, TextField } from '@mui/material'
import './Checkout.css'

const Checkout = () => {

    const { cart, clearCart } = useContext(CartContext)
    const { user } = useContext(AuthContext)
    const [preferenceId, setPreferenceId] = useState(null)
    const [shipmentCost, setShipmentCost] = useState(0)
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const paramValue = queryParams.get("status")
    const [isFormValid, setIsFormValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [userData, setUserData] = useState({
        name: "",
        lastname: "",
        phone: "",
        dni: "",
        province: "",
        city: "",
        zipcode: "",
        address: ""
    })
    const [orderId, setOrderId] = useState(null)

    initMercadoPago(import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY, { locale: 'es-AR' })

    useEffect(() => {
        let order = JSON.parse(localStorage.getItem("order"))
        if (paramValue === import.meta.env.VITE_PARAM_BUY_VALUE) {

            let ordersCollection = collection(db, "orders")
            addDoc(ordersCollection, { ...order, date: serverTimestamp() })
                .then(res => {
                    setOrderId(res.id)
                });

            order.items.forEach((elemento) => {
                updateDoc(doc(db, "products", elemento.id), {
                    stock: elemento.stock - elemento.quantity,
                });
            });

            localStorage.removeItem("order");
            clearCart();
        }

    }, [paramValue])

    useEffect(() => {
        const shipmentCollection = collection(db, "shipment")
        const shipmentDoc = doc(shipmentCollection, import.meta.env.VITE_SHIPMENT_ID)
        getDoc(shipmentDoc)
            .then(res => {
                setShipmentCost(res.data().cost)
            })
    }, [])

    useEffect(() => {
        // Verificar si todos los campos obligatorios están llenos
        const { name, lastname, phone, dni, province, city, zipCode, address } = userData;
        const allFieldsFilled = name && lastname && phone && dni && province && city && zipCode && address;
        setIsFormValid(allFieldsFilled);
    }, [userData]);

    const createPreference = async () => {
        const newCartArray = cart.map(product => {
            return { title: product.title, unit_price: product.unit_price, quantity: product.quantity }
        })
        try {
            const response = await Axios.post("https://backend-importados.vercel.app/create_preference", {
                items: newCartArray,
                shipment_cost: shipmentCost
            })
            const { id } = response.data;
            return id;
        } catch (error) {
            console.log(error);
        }
    }

    const handleBuy = async () => {
        let order = {
            email: user.email,
            name: userData.name,
            lastname: userData.lastname,
            phone: userData.phone,
            dni: userData.dni,
            province: userData.province,
            zipcode: userData.zipcode,
            address: userData.address,
            items: cart,
        }
        localStorage.setItem("order", JSON.stringify(order))
        setIsLoading(true)
        const id = await createPreference()
        if (id) {
            setPreferenceId(id)
            setIsLoading(false)
        }
    }

    const handleChange = e => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }

    return (
        <main id='checkout'>
            <section>
                {
                    !orderId ? <>
                        <div className='order-form'>
                            <h1>Finalizar orden</h1>
                            <form className='checkout-form'>
                                <div className='checkout-form-personal'>
                                    <TextField required className='checkout-form-input' name='name' label='Nombre' onChange={handleChange} />
                                    <TextField required className='checkout-form-input' name='lastname' label='Apellido' onChange={handleChange} />
                                </div>
                                <div className='checkout-form-personal'>
                                    <TextField required className='checkout-form-input' name='phone' label='Telefono' onChange={handleChange} />
                                    <TextField required className='checkout-form-input' name='dni' label='DNI' type='number' onChange={handleChange} />
                                </div>
                                <TextField required className='checkout-form-input' name='province' label='Provincia' fullWidth onChange={handleChange} />
                                <div className='checkout-form-personal'>
                                    <TextField required className='checkout-form-input' name='city' label='Ciudad' onChange={handleChange} />
                                    <TextField required className='checkout-form-input' name='zipCode' label='Codigo postal' type='number' onChange={handleChange} />
                                </div>
                                <TextField required className='checkout-form-input' name='address' label='Direccion' fullWidth onChange={handleChange} />
                                <Button disabled={!isFormValid} variant='contained' onClick={handleBuy} fullWidth>
                                    {isLoading ?
                                        <ClipLoader color="#fffff" loading={isLoading} size={40} />
                                        : 'Seleccione metodo de pago'
                                    }
                                </Button>
                            </form>

                        </div>
                    </> : <>
                        <main id='succesfull-order'>
                            <h2>Pago realizado con éxito. Código de compra: {orderId}</h2>
                            <Link className='btn' to='/shop'>Volver</Link>
                        </main>
                    </>
                }

                {
                    preferenceId && isFormValid && <Wallet initialization={{ preferenceId, redirectMode: "self" }} />
                }
            </section>
        </main>
    )
}

export default Checkout
