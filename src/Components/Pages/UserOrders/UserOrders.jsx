import React, { useContext, useEffect, useState } from 'react'
import { db } from '../../../firebaseConfig'
import { getDocs, collection, query, where } from 'firebase/firestore'
import './UserOrders.css'
import { AuthContext } from '../../../Context/AuthContext'
import { Link } from 'react-router-dom'


const UserOrders = () => {

  const [orders, setOrders] = useState([])
  const { user } = useContext(AuthContext)

  useEffect(() => {

    const ordersCollection = collection(db, "orders")
    let ordersQuery = query(ordersCollection, where("email", "==", user.email))
    getDocs(ordersQuery)
      .then(res => {
        const newArray = res.docs.map(order => {
          return { ...order.data(), id: order.id }
        })
        setOrders(newArray)
      })
      .catch(error => console.log(error))
  }, [user.email])


  return (
    <main id='orders'>
      {
        orders.length > 0 ? (<>
          <h1>Mis Compras</h1>
          <div className='order-container'>
            {
              orders.map(order => {
                return (
                  <div key={order.id} className='order-card'>
                    <p><strong>Cod. de orden:</strong> {order.id}</p>
                    {order.items.map(item => {
                      return (
                        <div className='order-card-information' key={item.id}>
                          <div>
                            <p><strong>Productos:</strong> {item.title} x{item.quantity}</p>
                            <p><strong>Precio:</strong> ${item.unit_price}</p>
                          </div>
                          <img src={item.image} alt="Foto de producto comprado" />
                        </div>
                      )
                    })}
                  </div>
                )
              })
            }
          </div>
        </>) : <>

          <div className='empty-orders'>
            <p>Parece que no tienes compras...</p>
            <Link className='btn' to='/shop'>Ir de compras</Link>
          </div>
        </>
      }
    </main>
  )
}

export default UserOrders