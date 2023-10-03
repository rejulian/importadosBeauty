import { Button, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useState } from 'react'
import { db, uploadFile } from '../../../firebaseConfig'
import { addDoc, collection } from 'firebase/firestore'
import { ClipLoader } from 'react-spinners';


const ProductsForm = ({ handleClose, setIsChange }) => {

    const [file, setFile] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [newProduct, setNewProduct] = useState({
        title: "",
        description: "",
        unit_price: 0,
        category: "",
        stock: 0,
        promote: false,
        image: ""
    })

    // const handleImage = async () => {
    //     const url = await uploadFile(file)
    //     setNewProduct({ ...newProduct, image: url })
    // }

    const handleChange = (e) => {
        setNewProduct({ ...newProduct, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const url = await uploadFile(file)
        const updatedProduct = { ...newProduct, image: url }
        console.log(updatedProduct);
        const productsCollection = collection(db, "products")
        addDoc(productsCollection, updatedProduct)
            .then(() => {
                setIsChange(true)
                setIsLoading(false)
                handleClose()
            })
    }

    return (
        <form onSubmit={handleSubmit} className='product-form'>
            {
                isLoading ? <ClipLoader color="#ffc1c1" loading={isLoading} size={70}/> : (
                    <>
                        <h1>Agregar producto</h1>
                        <TextField
                            label="Nombre"
                            name='title'
                            variant='outlined'
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            label="Descripcion"
                            name='description'
                            variant='outlined'
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            label="Precio"
                            type='number'
                            name='unit_price'
                            variant='outlined'
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            label="Categoria"
                            name='category'
                            variant='outlined'
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            label="Stock"
                            type='number'
                            name='stock'
                            variant='outlined'
                            onChange={handleChange}
                            fullWidth
                        />
                        <div className='select-form'>
                            <InputLabel id="promote">Destacar</InputLabel>
                            <Select
                                labelId="promote"
                                id="demo-simple-select"
                                value={false}
                                name='promote'
                                fullWidth
                                onChange={handleChange}
                            >
                                <MenuItem value={true}>Si</MenuItem>
                                <MenuItem value={false}>No</MenuItem>
                            </Select>
                        </div>
                        <TextField
                            type='file'
                            name='image'
                            variant='outlined'
                            fullWidth
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                        <Button fullWidth variant='contained' type='submit'>Crear</Button>
                    </>
                )
            }

        </form>
    )
}

export default ProductsForm