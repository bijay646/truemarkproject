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
          console.log(data)
          navigate('/')
      })
  }
  return (
    <>
      <div className='col-8 p-5 text-start mx-auto'>
        <div className='d-flex justify-content-between w-75 mb-5 mx-auto'>
          <h3>
            Delete Product
          </h3>
          <Link to='/' className='btn btn-primary'>GO BACK</Link>
        </div>
        <div className='container d-flex shadow-sm'>
          <div className='p-5 my-5 border-end border-3 text-center'>
            <h2 className='text-center text-decoration-underline'>Product Details</h2>
            <hr className='my-3'></hr>
            <h3>Product Name: <u>{product.product_name}</u></h3>
            <h3>Category: <u>{product.category_name}</u></h3>
            <h3>Status: <u>{product.status}</u></h3>
            <h3>Created By: <u>{product.created_by}</u></h3>
            <h3>Description:{product.description}</h3>

          </div>
          <div className='p-5 my-5 border-end border-3 text-center'>

            <p >Are you sure you want to delete this Product? </p>
            <button className='btn btn-danger' onClick={handleDeleteChange}>Delete Product</button>

          </div>
        </div>
      </div>
    </>
  )
}

export default DeleteProduct