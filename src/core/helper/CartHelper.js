//adding product to cart

export const AddItemTocart = (item , next) => {
    let cart = []
    if(typeof window !== undefined){
        
        //if any carts are available then moveing it in cart in the name of cart
        if(localStorage.getItem("cart")){
            cart = JSON.parse(localStorage.getItem("cart"));
        }
        cart.push({
            ...item,
            count :1
        })
        localStorage.setItem("cart" , JSON.stringify(cart));
        next();
    }
};

 export const loadCart = () =>{
     
    if(typeof window !== undefined){
        
        if(localStorage.getItem("cart")){
            return JSON.parse(localStorage.getItem("cart"));
        }
    }
 };


 //removing product from cart

    export const removeItemFromCart = (productId) => {
        let cart =[];

        if(typeof window !== undefined){
            if(localStorage.getItem("cart")){
                cart = JSON.parse(localStorage.getItem("cart"));
            }
         
         cart.map((product , index)=> {
             if(product._id === productId){
                 cart.splice(index,1) //here 1 represents no of items
             }
         } )
         localStorage.setItem("cart" , JSON.stringify(cart));
      }
         return cart;
   }


   //whenever user do the payment , once the payment is done so then we have to remove item from the cart ,reload the page (automatically).

   export const emptyCart = (next) => {
       if(typeof window !== undefined){
           localStorage.removeItem("cart")
           next();
       }
   }
 