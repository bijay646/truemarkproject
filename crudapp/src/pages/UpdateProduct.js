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
      <div className='col-lg-8 col-md-9 col-sm-11 col-11 py-5 px-2 text-start mx-auto'>
        <div className='d-flex justify-content-between mb-5'>
          <h3>
            Update Product
          </h3>
          <Link to='/' className='btn btn-primary'>GO BACK</Link>
        </div>
        <div className='container row rounded-2 shadow' style={{backgroundColor:'hsl(0, 0%, 59%)'}}>
          <div className='col-lg-6 col-md-6 col-sm-12 col-12 my-5  text-center bordercss'>
            <h5 className='text-center text-decoration-underline'>Product Details</h5>
            <hr className='my-3'></hr>
            <p>Product Name: <u>{product_name}</u></p>
            <p>Category: <u>{category_name}</u></p>
            <p>Status: <u>{status}</u></p>
            <p>Created By: <u>{created_by}</u></p>
            <p>Description:{description}</p>

          </div>
          <form className='col-lg-6 col-md-6 col-sm-12 col-12 my-5 text-center'>
            <h5 className='text-decoration-underline mb-3'>Update Product</h5>
            <hr className='my-3'></hr>
            <label htmlFor='pname'>Product Name</label>
            <input type={'text'} id='pname' className='form-control mb-3' onChange={handleChange('product_name')} value={product_name} />

            <label htmlFor='category'>Category</label>
            <input type={'text'} id='category' value={category_name} className='form-control mb-3' readOnly/>

            
            <label htmlFor='stat'>Status</label>
            <select className='form-control mb-2' id='stat' onChange={handleChange('status')}>
              <option defaultValue={status}>{status}</option>
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