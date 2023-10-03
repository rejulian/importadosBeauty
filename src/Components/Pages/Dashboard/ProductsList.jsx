import React, { useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { db } from '../../../firebaseConfig';
import { deleteDoc, doc } from 'firebase/firestore';
import ProductsForm from './ProductsForm';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const ProductsList = ({ products, setIsChange }) => {

    const [open, setOpen] = useState(false)
    const [productSelected, setProductSelected] = useState(null)

    const deleteProduct = (id) => {
        deleteDoc(doc(db, "products", id))
        setIsChange(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleOpen = (product) => {
        setProductSelected(product)
        setOpen(true)
    }

    return (
        <>
            <Button variant='contained' className='btn' onClick={() => handleOpen(null)}> <AddIcon />Agregar</Button>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Imagen</TableCell>
                            <TableCell align="left">Titulo</TableCell>
                            <TableCell align="left">Precio</TableCell>
                            <TableCell align="right">Stock</TableCell>
                            <TableCell align="right">Categoria</TableCell>
                            <TableCell align="right">Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow
                                key={product.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" align="left">
                                    <img src={product.image} alt="Imagen de producto" style={{ width: "80px", height: "105px" }} />
                                </TableCell>
                                <TableCell align="left">{product.title}</TableCell>
                                <TableCell align="left">${product.unit_price}</TableCell>
                                <TableCell align="right">{product.stock}</TableCell>
                                <TableCell align="right">{product.category}</TableCell>
                                <TableCell component="th" scope="row" align="right">
                                    <IconButton onClick={() => handleOpen(product)}>
                                        <EditIcon color='primary' />
                                    </IconButton>
                                    <IconButton onClick={() => deleteProduct(product.id)}>
                                        <DeleteIcon color='primary' />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <ProductsForm
                        handleClose={handleClose} 
                        setIsChange={setIsChange} 
                        productSelected={productSelected}
                        setProductSelected={setProductSelected}
                    />
                </Box>
            </Modal>
        </>
    )
}

export default ProductsList