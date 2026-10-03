import {
  Routes, 
  Route,
  
} from 'react-router'
import { useEffect } from 'react'

import Home from './pages/Home'
import Cart from './pages/Cart'
import Shop from './pages/Shop'
import ProductDetails from './pages/ProductDetails'
import Checkout from './pages/Checkout'

import Signup from './pages/authPages/Signup'
import Login from './pages/authPages/Login'
import OptPage from './pages/authPages/OptPage'

import ProtectRoute from './components/ProtectRoute'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProductsList from './pages/admin/AdminProductsList';
import AdminAddProduct from './pages/admin/AdminAddProduct';
import AdminOrders from './pages/admin/AdminOrders';
import AdminEditProduct from './pages/admin/AdminEditProduct';

import AdminRoute from './components/AdminRoute';
import AdminLayout from './layouts/AdminLayout';

import OrderHistoryPage from './pages/OrderHistoryPage'
import VerifyOrderPage from './pages/verifyOrder'

import useUserStore from './store/useUserStore'
import useCartStore from './store/useCartStore'

const App = () => {
  const { checkMe } = useUserStore();
  const { fetchCart } = useCartStore()

  useEffect(() => {
    checkMe()
  }, [])

  useEffect(() => {
    fetchCart()
  }, [])

  return (
    <div className='min-h-screen bg-main-bg'>
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/details/:id' element={<ProductDetails />} />
        <Route path='/checkout' element={<Checkout />} />

        <Route path='/order-history' element={<OrderHistoryPage />} />
        <Route path='/orders/:id/verify' element={<VerifyOrderPage />} />

        //auth pages
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/validate-otp' element={<OptPage />} />

        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminLayout />}>

            <Route index element={<AdminDashboard />} />                     
            <Route path="products" element={<AdminProductsList />} />        
            <Route path="add-product" element={<AdminAddProduct />} />     
            <Route path="orders" element={<AdminOrders />} />       
            <Route path='edit-product/:id' element={<AdminEditProduct />} />   
            
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App