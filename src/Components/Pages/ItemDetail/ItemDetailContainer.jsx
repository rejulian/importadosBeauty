import React, { useEffect, useState } from 'react'
import { getDoc, collection, doc } from 'firebase/firestore'
import { db } from '../../../firebaseConfig'
import { useParams } from 'react-router-dom'
import './ItemDetail.css'
import ItemDetail from './ItemDetail'

const ItemDetailContainer = () => {
    const { id } = useParams()
    const [product, setProduct] = useState(null)

    const refCollection = collection(db, "products")
    const refDoc = doc(refCollection, id)

    const getProduct = async () => {
        try {
            const response = await getDoc(refDoc)
            setProduct({...response.data(), id: response.id})
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
                product && <ItemDetail product={product} />
            }
        </main>
    )
}

export default ItemDetailContainer