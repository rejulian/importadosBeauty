import { Button, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useState } from 'react'
import { db, uploadFile } from '../../../firebaseConfig'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
import { ClipLoader } from 'react-spinners';


const ProductsForm = ({ handleClose, setIsChange, productSelected, setProductSelected }) => {

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
        if (productSelected) {
            setProductSelected({
                ...productSelected,
                [e.target.name]: e.target.value
            })
        } else {
            setNewProduct({ ...newProduct, [e.target.name]: e.target.value })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const productsCollection = collection(db, "products")

        if (productSelected) {
            setIsLoading(true)
            const url = await uploadFile(file)
            const updatedProduct = { ...productSelected, image: url }

            updateDoc(doc(productsCollection, updatedProduct.id), updatedProduct)
                .then(()=>{
                    setIsChange(true)
                    setIsLoading(false)
                    handleClose()
                })
        } else {
            setIsLoading(true)
            const url = await uploadFile(file)
            const updatedProduct = { ...newProduct, image: url }

            addDoc(productsCollection, updatedProduct)
                .then(() => {
                    setIsChange(true)
                    setIsLoading(false)
                    handleClose()
                })
        }
    }

// 13.55

    return (
        <form onSubmit={handleSubmit} className='product-form'>
            {
                isLoading ? <ClipLoader color="#ffc1c1" loading={isLoading} size={70} /> : (
                    <>
                        {productSelected ? <h1>Editar producto</h1> : <h1>Agregar producto</h1>}
                        <TextField
                            defaultValue={productSelected?.title}
                            label="Nombre"
                            name='title'
                            variant='outlined'
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            defaultValue={productSelected?.description}
                            label="Descripcion"
                            name='description'
                            variant='outlined'
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            defaultValue={productSelected?.unit_price}
                            label="Precio"
                            type='number'
                            name='unit_price'
                            variant='outlined'
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            defaultValue={productSelected?.category}
                            label="Categoria"
                            name='category'
                            variant='outlined'
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            defaultValue={productSelected?.stock}
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
                                defaultValue={productSelected?.promote ? productSelected.promote : newProduct.promote}
                                labelId="promote"
                                id="demo-simple-select"
                                // value={newProduct.promote}
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
                        <Button fullWidth variant='contained' type='submit'>{productSelected ? 'Editar' : 'Crear'}</Button>
                    </>
                )
            }

        </form>
    )
}

export default ProductsForm