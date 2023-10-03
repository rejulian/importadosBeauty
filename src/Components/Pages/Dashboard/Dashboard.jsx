import React, { useEffect, useState } from 'react'
import { db } from '../../../firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'
import ProductsList from './ProductsList'
import { ClipLoader } from 'react-spinners';
import './Dashboard.css'

const Dashboard = () => {

  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isChange, setIsChange] = useState(false)

  
  useEffect(() => {
    setIsChange(false)
    setIsLoading(true)
    const productsCollection = collection(db, "products")
    getDocs(productsCollection)
    .then(res=>{
      const newArray = res.docs.map(product => {
        return {
          ...product.data(),
          id : product.id
        }
      })
      setProducts(newArray);
      setIsLoading(false)
    })
    .catch(error=>{
      setIsLoading(false)
    })
  }, [isChange])

  return (
    <main id='dashboard'>
      {
        isLoading ? <ClipLoader color="#ffc1c1" loading={isLoading} size={70}/> : <ProductsList products={products} setProducts={setProducts} setIsChange={setIsChange}/>
      }
    </main>
  )
}

export default Dashboard