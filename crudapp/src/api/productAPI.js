export const getProducts = () => {
     return fetch("https://product-fhqo.onrender.com/products",{
         method: "GET"
     })
     .then(res=>res.json())
     .catch(err=>console.log(err))
 }


 