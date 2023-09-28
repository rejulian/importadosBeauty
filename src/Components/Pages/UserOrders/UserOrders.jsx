import React, { useContext, useEffect, useState } from 'react'
import { db } from '../../../firebaseConfig'
import { getDocs, collection, query, where } from 'firebase/firestore'
import './UserOrders.css'
import { AuthContext } from '../../../Context/AuthContext'


const UserOrders = () => {

  const [orders, setOrders] = useState([])
  const {user} = useContext(AuthContext)

  useEffect(()=>{

    const ordersCollection = collection(db, "orders")
    let ordersQuery = query(ordersCollection, where("email", "==", user.email))
    getDocs(ordersQuery)
    .then(res => {
      const newArray = res.docs.map(order => {
        return {...order.data(), id: order.id}
      })
      setOrders(newArray)
    }) 
    .catch(error=>console.log(error))

  },[user.email])

  return (
    <main id='orders'>
      <h1>Mis Compras</h1>
      {
        orders.map(order=>{
          return (
            <div key={order.id}>
              <h2>orden</h2>
            </div>
          )
        })
      }
    </main>
  )
}

export default UserOrders