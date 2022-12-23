import { API } from "../config"

//get all products
export const getProducts = () => {
     return fetch(`${API}`,{
         method: "GET"
     })
     .then(res=>res.json())
     .catch(err=>console.log(err))
 }

//add product
 export const addProduct = (product) =>{
    return fetch (`${API}`,{
        method: "POST",
        headers:{
            Accept: "application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(product)
    })
    .then(res=>res.json())
     .catch(err=>console.log(err))
 }


 //get product details
 export const getProductDetails = (id) => {
    return fetch(`${API}/${id}`,{
        method: "GET"
    })
    .then(res=>res.json())
    .catch(err=>console.log(err))
}


 //delete product
 export const deleteProduct = (id) => {
    return fetch(`${API}/${id}`,{
        method: "DELETE"
    })
    .then(res=>res.json())
    .catch(err=>console.log(err))
}


// to update product
export const updateProduct = (id, product) => {
    return fetch(`${API}/${id}`,{
        method:"PUT",
        headers:{
            Accept: "application/json",
            "Content-Type":"application/json",
        },
        body: JSON.stringify(product)
    })
    .then(res=>res.json())
    .catch(error=>console.log(error))
}

