import { API } from "../../backend";


//createing category
export const createCategory = (userId, token, category) => {
  return fetch(`${API}/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(category) //backend accept json in string format so stringify
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

//get all categories  (because every product need category so we can handle them easily)
     
export const getAllCategories = () => {
    return fetch(`${API}/categories` , {
        method : "GET",
    }).then(response => {
        return response.json();
         })
    .catch(err => console.log(err));
}

     //get a single category
     export const getCategory = categoryId => {
    return fetch(`${API}/category/${categoryId}` , {
      method:"GET"
  }).then(response => {
    return response.json();
     })
.catch(err => console.log(err));
}
    //delete product
    export const deleteCategory = (categoryId,userId , token ) => {
      return fetch(`${API}/category/${categoryId}/${userId}` , {
          method : "DELETE",
          headers:{
              Accept:"application/json",
              Authorization: `Bearer ${token}`}
             }) 
          .then(response => 
             {
               return response.json();
              })
          .catch(err => console.log(err));
  }
    //update category 
    export const updateCategory= (categoryId,userId , token , category) => {
      return fetch(`${API}/category/${categoryId}/${userId}` , {
          method : "PUT",
          headers:{
              Accept:"application/json",
              Authorization: `Bearer ${token}`
          },
          body: category,userId
      }) .then(response => {
          return response.json();
      })
          .catch(err => console.log(err));
  }



//products calls

export const createProduct = (userId , token , product) => {
    return fetch(`${API}/product/create/${userId}` , {
        method : "POST",
        headers:{
            Accept:"application/json",
            Authorization: `Bearer ${token}`
        },
        body: product
    }) .then(response => {
        return response.json();
    })
        .catch(err => console.log(err));}

//get all the products
export const getAllProducts = () => {
    return fetch(`${API}/product`, {
      method: "GET"
    })
      .then(response => {
        return response.json();

      })
      .catch(err => console.log(err));
  };


 
//get a single product
export const getProduct = productId => {
    return fetch(`${API}/product/${productId}` , {
        method:"GET"
    }).then(response => {
      return response.json();
       })
  .catch(err => console.log(err));
}

//update a product

export const updateProduct = (productId,userId , token , product) => {
    return fetch(`${API}/product/${productId}/${userId}` , {
        method : "PUT",
        headers:{
            Accept:"application/json",
            Authorization: `Bearer ${token}`
        },
        body: product,userId
    }) .then(response => {
        return response.json();
    })
        .catch(err => console.log(err));
}

//delete a product 
export const deleteProduct = (productId,userId , token ) => {
    return fetch(`${API}/product/${productId}/${userId}` , {
        method : "DELETE",
        headers:{
            Accept:"application/json",
            Authorization: `Bearer ${token}`}
           }) 
        .then(response => 
           {
             return response.json();
            })
        .catch(err => console.log(err));
}
