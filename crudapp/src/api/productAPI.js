//get all products
export const getProducts = () => {
     return fetch("https://product-fhqo.onrender.com/products",{
         method: "GET"
     })
     .then(res=>res.json())
     .catch(err=>console.log(err))
 }

//add product
 export const addProduct = (product) =>{
    return fetch ("https://product-fhqo.onrender.com/products/",{
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
    return fetch(`https://product-fhqo.onrender.com/products/${id}`,{
        method: "GET"
    })
    .then(res=>res.json())
    .catch(err=>console.log(err))
}


 //delete product
 export const deleteProduct = (id) => {
    return fetch(`https://product-fhqo.onrender.com/products/${id}`,{
        method: "DELETE"
    })
    .then(res=>res.json())
    .catch(err=>console.log(err))
}


// to update product
export const updateProduct = (id, product) => {
    return fetch(`https://product-fhqo.onrender.com/products/${id}`,{
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

