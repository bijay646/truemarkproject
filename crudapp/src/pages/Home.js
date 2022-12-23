import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import dateFormat from 'dateformat';
import { getProducts } from '../api/productAPI';


const Home = () => {
  const [products, setproducts] = useState([]);
  const [search, setSearch] = useState('')
  const [filteredProducts, setfilteredProducts] = useState([])

  useEffect(() => {
    getProducts()
      .then(data => {
        if (data.error) {
          console.log(data.error)
        }
        else {
          setproducts(data.products)
        }
      })
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    setfilteredProducts(products.filter(item =>
      item.product_name.toUpperCase().match(search.toUpperCase()) || item.category_name.toUpperCase().match(search.toUpperCase())))
  }, [search])


  return (
    <>
      <div className='p-5 text-start'>
        <div className='container w-75'>
          <div>
            <h3 className='text-success'>
              CRUD Operation
            </h3>
            <div className='row d-flex'>
              <div className='col-6'>
                <Link to='/product/add' className='btn btn-primary'>Add Product</Link>
              </div>
              <div className='col-6'>
                <form className="d-flex" role="search">
                  <input className="form-control me-2 mb-4 border border-2 border-warning text-success"
                    type="search" placeholder="Search product" aria-label="Search" onChange={e => setSearch(e.target.value)} />
                </form>
              </div>
            </div>
          </div>
          <table className='table text-center table-hover mt-5 shadow-sm ' style={{ fontSize: '18px' }} >
            <thead >
              <tr style={{ borderBottom: "3px solid grey" }}>
                <th>Name</th>
                <th>Category</th>
                <th>Description</th>
                <th>Created At</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody style={{ fontSize: '18px' }}>
              {search ?
                filteredProducts.map((product, i) => {
                  return <tr key={i} style={{ fontSize: '18px !important' }}>
                    <td><h4>{product.product_name}</h4></td>
                    <td><h4>{product.category_name}</h4></td>
                    <td><h4>{product.description}</h4></td>
                    <td><h4>{dateFormat(product.created_at, "yyyy-mm-dd")}</h4></td>
                    <td><h4>{product.status}</h4></td>
                    <td>
                      <div className='btn-group'>
                        <Link to={`/product/update/${product.id}`} className='btn btn-warning'><i className='bi bi-pencil' /></Link>
                        <Link to={`/product/delete/${product.id}`} className='btn btn-danger'><i className='bi bi-trash' /></Link>
                      </div>
                    </td>

                  </tr>
                })
                : products.map((product, i) => {
                  return <tr key={i} style={{ fontSize: '18px !important' }}>
                    <td><h4>{product.product_name}</h4></td>
                    <td><h4>{product.category_name}</h4></td>
                    <td><h4>{product.description}</h4></td>
                    <td><h4>{dateFormat(product.created_at, "yyyy-mm-dd")}</h4></td>
                    <td><h4>{product.status}</h4></td>
                    <td>
                      <div className='btn-group'>
                        <Link to={`/product/update/${product.id}`} className='btn btn-warning'><i className='bi bi-pencil' /></Link>
                        <Link to={`/product/delete/${product.id}`} className='btn btn-danger'><i className='bi bi-trash' /></Link>
                      </div>
                    </td>

                  </tr>
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Home