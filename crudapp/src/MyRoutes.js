import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AddProduct from './pages/AddProduct'
import DeleteProduct from './pages/DeleteProduct'
import Home from './pages/Home'
import UpdateProduct from './pages/UpdateProduct'
const MyRoutes = () => {
  return (
    <Router>
          <Routes>
               <Route path='/' element={<Home/>}/>
               <Route path='/product/add' element={<AddProduct/>}/>
               <Route path='/product/delete/:id' element={<DeleteProduct/>}/>
               <Route path='/product/update/:id' element={<UpdateProduct/>}/>
          </Routes>

    </Router>
  )
}

export default MyRoutes