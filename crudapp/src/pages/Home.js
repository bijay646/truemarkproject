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
      <div className='container col-lg-8 col-md-10 col-sm-11 col-11 mt-4 text-start mx-auto'>
        <div>
          <h3>
            CRUD Operation
          </h3>
          <div className='row '>
            <div className='col-lg-6 col-sm-4 col-12'>
              <Link to='/product/add' className='btn btn-primary'>Add Product</Link>
            </div>
            <div className='col-lg-6 col-sm-8 col-12'>
              <form className="d-flex" role="search">
                <input className="form-control me-2 mb-4 border border-2 border-warning text-success"
                  type="search" placeholder="Search product" aria-label="Search" onChange={e => setSearch(e.target.value)} />
              </form>
            </div>
          </div>
        </div>
        <table className='table text-center table-hover mt-5 rounded-2 shadow' style={{backgroundColor:'hsl(0, 0%, 59%)'}}>
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
          <tbody>
            {search ?
              filteredProducts.map((product, i) => {
                return <tr key={i}>
                  <td>{product.product_name}</td>
                  <td>{product.category_name}</td>
                  <td>{product.description}</td>
                  <td>{dateFormat(product.created_at, "yyyy-mm-dd")}</td>
                  <td>{product.status}</td>
                  <td>
                    <div className='btn-group'>
                      <Link to={`/product/update/${product.id}`} className='btn btn-warning'><i className='bi bi-pencil' /></Link>
                      <Link to={`/product/delete/${product.id}`} className='btn btn-danger'><i className='bi bi-trash' /></Link>
                    </div>
                  </td>

                </tr>
              })
              : products.map((product, i) => {
                return <tr key={i} >
                  <td>{product.product_name}</td>
                  <td>{product.category_name}</td>
                  <td>{product.description}</td>
                  <td>{dateFormat(product.created_at, "yyyy-mm-dd")}</td>
                  <td>{product.status}</td>
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

    </>
  )
}

export default Home