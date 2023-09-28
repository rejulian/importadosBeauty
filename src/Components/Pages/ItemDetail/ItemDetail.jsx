import { Button, FormControl, InputLabel, MenuItem, Select, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import React, { useContext, useState } from 'react'
import { CartContext } from '../../../Context/CartContext';

const ItemDetail = ({ product }) => {
    const { image, title, description, unit_price, stock, id } = product;
    const [counter, setCounter] = useState(1)
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const { addToCart } = useContext(CartContext)

    const stockOptions = Array.from({ length: stock }, (_, index) => index + 1);

    const openAlert = (message) => {
        setAlertMessage(message);
        setIsAlertOpen(true);
    };

    const onAdd = () => {
        const productObj = {
            ...product,
            quantity: counter
        }
        addToCart(productObj)
        openAlert('Se agregó al carrito');
    }

    return (
        <div className='card-detail'>
            <img src={image} alt="Victoria Secret Product" />
            <div className='card-detail-info'>
                <h1>{title}</h1>
                <h3>${unit_price}</h3>
                <p>{description}</p>
                <FormControl className='card-detail-form' fullWidth>
                    {stock > 0 ?
                        <>
                            <InputLabel id="demo-simple-select-label">Cantidad</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Cantidad"
                                value={counter}
                                onChange={e => setCounter(e.target.value)}
                            >
                                {stockOptions.map((_, index) => (
                                    <MenuItem key={index + 1} value={index + 1}>
                                        {index + 1}
                                    </MenuItem>
                                ))}
                            </Select>
                        </>
                        : <div className='no-stock'><h3>SIN STOCK</h3></div>
                    }
                    <div className='card-detail-btn'>
                        <Button style={{ cursor: stock > 0 ? 'pointer' : 'not-allowed', visibility: stock > 0 ? 'visible' : 'hidden' }} className='btn-comprar' variant='contained'>Comprar ahora</Button>
                        <Button style={{ cursor: stock > 0 ? 'pointer' : 'not-allowed', visibility: stock > 0 ? 'visible' : 'hidden' }} onClick={onAdd} className='btn-agregar' variant='outlined'>Agregar al carrito</Button>
                    </div>
                </FormControl>
            </div>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={isAlertOpen}
                autoHideDuration={3000}
                onClose={() => setIsAlertOpen(false)}
            >
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    severity="success"
                    onClose={() => setIsAlertOpen(false)}
                >
                    {alertMessage}
                </MuiAlert>
            </Snackbar>
        </div>
    )
}

export default ItemDetail