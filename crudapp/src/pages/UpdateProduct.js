import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { updateProduct, getProductDetails, getProducts } from '../api/productAPI';

const UpdateProduct = () => {
  const [statusname, setStatusname] = useState([])
  const [product, setProduct] = useState({
    product_name: '',
    category_name: '',
    description: '',
    created_by: '',
    status: ''
  })
  const { product_name, category_name, description, created_by, status, } = product
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

  useEffect(() => {
    getProducts()
      .then(data => {
        if (data.error) {
          console.log(data.error)
        }
        else {
          setStatusname(data.product_status)
        }
      })
  }, [])

  const handleChange = name => e => {
    e.preventDefault()
    setProduct({ ...product, [name]: e.target.value })
  }

  const handleUpdateChange = e => {
    e.preventDefault()
    updateProduct(id,product)
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
            Update Product
          </h3>
          <Link to='/' className='btn btn-primary'>GO BACK</Link>
        </div>
        <div className='container d-flex shadow-sm'>
          <div className='p-5 my-5 border-end border-3 text-center'>
            <h2 className='text-center text-decoration-underline'>Product Details</h2>
            <hr className='my-3'></hr>
            <h3>Product Name: <u>{product_name}</u></h3>
            <h3>Category: <u>{category_name}</u></h3>
            <h3>Status: <u>{status}</u></h3>
            <h3>Created By: <u>{created_by}</u></h3>
            <h3>Description:{description}</h3>

          </div>
          <form className='w-75 mx-auto p-5 my-5'>
            <h2 className='text-decoration-underline mb-3'>Update Information</h2>
            <hr className='my-3'></hr>
            <label htmlFor='pname'>Product Name</label>
            <input type={'text'} id='pname' className='form-control mb-3' onChange={handleChange('product_name')} value={product_name} />

            <label htmlFor='category'>Category</label>
            <input type={'text'} id='category' value={category_name} className='form-control mb-3' readOnly/>

            
            <label htmlFor='stat'>Status</label>
            <select className='form-control mb-2' id='stat' onChange={handleChange('status')}>
              <option value={status} selected>{status}</option>
              {
                statusname.map((status, i) => {
                  return <option key={i} value={status}>{status}</option>
                })
              }
            </select>

            <label htmlFor='pdesc'>Description</label>
            <textarea id='pdesc' className='form-control mb-3' value={description} onChange={handleChange('description')} />

            <button className='btn btn-warning mt-3 form-control' onClick={handleUpdateChange}>Update Product</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default UpdateProduct