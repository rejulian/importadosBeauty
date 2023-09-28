import { BrowserRouter } from 'react-router-dom'
import './App.css'
import AppRouter from './Router/AppRouter'
import CartContextComponent from './Context/CartContext'
import AuthContextComponent from './Context/AuthContext'

function App() {

  return (
    <BrowserRouter>
      <AuthContextComponent>
        <CartContextComponent>
            <AppRouter />
        </CartContextComponent>
      </AuthContextComponent>
    </BrowserRouter>
  )
}

export default App
