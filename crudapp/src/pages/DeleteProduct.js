import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteProduct, getProductDetails } from '../api/productAPI';


const DeleteProduct = () => {
  const [product, setProduct] = useState({})
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    getProductDetails(id)
      .then(data => {
        if (data.error) {
          console.log(data.error)
        }
        else {
          setProduct(data)
          console.log(data)
        }
      })
      .catch(error => console.log(error))
  }, [])
  const handleDeleteChange = e => {
    e.preventDefault()
    deleteProduct(id)
      .then(data => {
        navigate('/')
      })
  }
  return (
    <>
      <div className='col-lg-8 col-md-9 col-sm-11 col-11 py-5 px-2 text-start mx-auto'>
        <div className='d-flex justify-content-between mb-5'>
          <h3>
            Delete Product
          </h3>
          <Link to='/' className='btn btn-primary'>GO BACK</Link>
        </div>
        <div className='container row rounded-2 shadow' style={{ backgroundColor: 'hsl(0, 0%, 59%)' }}>
          <div className='col-lg-6 col-md-6 col-sm-12 col-12 my-5 text-center bordercss'>
            <h5 className='text-center text-decoration-underline'>Product Details</h5>
            <hr className='my-3'></hr>
            <p>Product Name: <u>{product.product_name}</u></p>
            <p>Category: <u>{product.category_name}</u></p>
            <p>Status: <u>{product.status}</u></p>
            <p>Created By: <u>{product.created_by}</u></p>
            <p>Description:{product.description}</p>
          </div>
          <div className='col-lg-6 col-md-6 col-sm-12 col-12 my-5 text-center'>
            <p >Are you sure you want to delete this Product? </p>
            <button className='btn btn-danger' onClick={handleDeleteChange}>Delete Product</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default DeleteProduct