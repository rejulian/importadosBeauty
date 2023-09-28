import Cart from '../Components/Pages/Cart/Cart';
import Checkout from '../Components/Pages/Checkout/Checkout';
import ForgotPassword from '../Components/Pages/ForgotPassword/ForgotPassword';
import Home from '../Components/Pages/Home/Home'
import ItemDetailContainer from '../Components/Pages/ItemDetail/ItemDetailContainer';
import ItemListContainer from '../Components/Pages/ItemList/ItemListContainer'
import Login from '../Components/Pages/Login/Login';
import Register from '../Components/Pages/Register/Register';

export const routes = [
    {
        id:'home',
        path:'/',
        Element: Home
    },
    {
        id:'login',
        path:'/login',
        Element: Login
    },
    {
        id:'register',
        path:'/register',
        Element: Register
    },
    {
        id:'forgot-password',
        path:'/forgot-password',
        Element : ForgotPassword 
    },
    {
        id:'shop',
        path:'/shop',
        Element: ItemListContainer
    },
    {
        id:'item-detail',
        path:'/product/:id',
        Element: ItemDetailContainer
    },
    {
        id:'cart',
        path:'/cart',
        Element: Cart
    },
];