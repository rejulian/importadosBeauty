import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { routes } from './routes'
import Navbar from '../Components/Layout/Navbar'
import Dashboard from '../Components/Pages/Dashboard/Dashboard'
import ProtectedAdmin from './ProtectedAdmin'
import ProtectedUsers from './ProtectedUsers'
import Checkout from '../Components/Pages/Checkout/Checkout'
import UserOrders from '../Components/Pages/UserOrders/UserOrders'

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<Navbar />} >
        {routes.map(({ id, path, Element }) => (
          <Route key={id} path={path} element={<Element />} />
        ))}
      </Route>

      {/* PROTECTED ROUTE FOR LOGGED USERS */}
      <Route element={<ProtectedUsers />}>
        <Route element={<Navbar />} >
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/user-orders' element={<UserOrders />} />
        </Route>
      </Route>

      {/* PROTECTED ROUTE FOR ADMINS */}
      <Route element={<ProtectedAdmin />}>
        <Route element={<Navbar />} >
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
      </Route>

    </Routes>
  )
}

export default AppRouter