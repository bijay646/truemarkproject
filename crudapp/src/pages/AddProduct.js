import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { addProduct, getProducts } from '../api/productAPI'


const AddProduct = () => {
  const [categories, setCategories] = useState([])
  const [statusname, setStatusname] = useState([])
  const navigate = useNavigate()
  const [product, setProduct] = useState({
    product_name: '',
    category_name: '',
    description: '',
    created_by: '',
    status: ''
  })
  const { product_name, category_name, description, created_by, status, } = product
  let ref1 = useRef()
  let ref2 = useRef()

  useEffect(() => {
    getProducts()
      .then(data => {
        if (data.error) {
          console.log(data.error)
        }
        else {
          setCategories(data.product_categories)
          setStatusname(data.product_status)
        }
      })
  }, [])

  const handleChange = name => e => {
    e.preventDefault()
    let value = e.target.value
    setProduct({ ...product, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addProduct(product)
      .then(data => {
        if (data.error) {
          console.log(data.error)
        }
        else {
          setProduct({ ...product, product_name: '', description: '', created_by: '' })
          ref1.current.value = ''
          ref2.current.value = ''
          navigate('/')

        }
      })
  }
  return (
    <>
      <div className='container col-lg-8 col-md-9 col-sm-12 col-12 p-4 mt-3 text-start mx-auto '>
        <div className='d-flex justify-content-between'>
          <h3>
            Add Product
          </h3>
          <Link to='/' className='btn btn-primary'>Go Back</Link>
        </div>

        <form className='p-5 rounded-2 shadow mt-4' style={{backgroundColor:'hsl(0, 0%, 59%)'}}>
          <label htmlFor='product_name'>Product Name</label>
          <input type={'text'} className='form-control mb-2' id='product_name' onChange={handleChange('product_name')} value={product_name} />

          <label htmlFor='category'>Category</label>
          <select className='form-control mb-2' id='category' onChange={handleChange('category_name')} ref={ref1}>
            <option></option>
            {
              categories.map((category, i) => {
                return <option key={i} value={category}>{category}</option>
              })
            }
          </select>

          <label htmlFor='desc'>Description</label>
          <textarea className='form-control mb-2' id='desc' onChange={handleChange('description')} value={description} />

          <label htmlFor='created'>Created By</label>
          <textarea className='form-control mb-2' id='created' onChange={handleChange('created_by')} value={created_by} />

          <label htmlFor='stat'>Status</label>
          <select className='form-control mb-2' id='stat' onChange={handleChange('status')} ref={ref2}>
            <option></option>
            {
              statusname.map((status, i) => {
                return <option key={i} value={status}>{status}</option>
              })
            }
          </select>

          <button className='btn btn-warning form-control mt-3' onClick={handleSubmit}>Add Product</button>
        </form>

      </div>
    </>
  )
}

export default AddProduct