import React, { useEffect, useState } from 'react'
import { getDoc, collection, doc } from 'firebase/firestore'
import { db } from '../../../firebaseConfig'
import { useParams } from 'react-router-dom'
import './ItemDetail.css'
import ItemDetail from './ItemDetail'
import { ClipLoader } from 'react-spinners';


const ItemDetailContainer = () => {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const refCollection = collection(db, "products")
    const refDoc = doc(refCollection, id)

    const getProduct = async () => {
        try {
            setIsLoading(true)
            const response = await getDoc(refDoc)
            setProduct({ ...response.data(), id: response.id })
            setIsLoading(false)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getProduct()
    }, [id])

    return (
        <main id='detail'>
            
            {
                product ? <ItemDetail product={product} /> : <ClipLoader color="#ffc1c1" loading={isLoading}/>
            }
        </main>
    )
}

export default ItemDetailContainer