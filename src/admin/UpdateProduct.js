
import React, { useState ,useEffect} from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { getAllCategories , getProduct ,updateProduct} from "./helper/adminapicall"

const UpdateProduct = ({match}) => {
    const {user ,token } = isAuthenticated();
    const [values , setValues] = useState({
        name:"",
        description:"",
        price:"",
        stock : "",
        photo : "",
        categories:[],
        category:"",
        loading:false,
        error : "",
        createdProduct : "",
        getaRedirect:"",
        formData:""    });

    const {name , price,description,stock ,categories,category,loading,error,createdProduct,getaRedirect,formData} = values;

    //on submitiing or create product button
    const onSubmit = event => {
        event.preventDefault();
        setValues({...values , error : "" , loading : true});
        
        updateProduct(match.params.productId,user._id ,token ,formData).then(data => {
            if(data.error) {
                setValues({...values , error:data.error});
            }else {
                setValues({
                    ...values,
                    name:"",
                    description:"",
                    price:"",
                    photo:"",
                    stock:"",
                    loading:false,
                    createdProduct: data.name
                });
            }
        })
        
    };

    
    const successMessage =() => (
        <div className="alert alert-success mt-3" style={{display:createdProduct ? "" : "none"}}>
            <h4>{createdProduct} :- Updated Successfully</h4>
        </div>

        
        
      );
      //if product is created then edirect to admin home after 7seconds
  if(createdProduct){
    setTimeout(function(){ window.location="/admin/dashboard"; },7000);
  }
      
    const errorMessage = () => {
        if (error) {
          return <div className="alert alert-danger mt-3">
            <h4>Failed to update Product</h4>
            </div>;
        }
      };


    //handling on change in inputs
    const handleChange = name => event => {
        //photo 
        const value = name === "photo" ? event.target.files[0] :event.target.value ;
        formData.set(name, value);
        setValues({...values , [name]:value});
      
    };

    //pre-loading the data from the database so that it will help in creating product
    
    const preLoad = (productId) => {
        getProduct(productId).then(data => {
            console.log(data);
            if(data.error){
                setValues({...values , error:data.error})
            }
            else{
                setValues({...values , 
                name:data.name,
                description:data.description,
                price:data.price ,
                category:data.category._id,
                stock:data.stock,
                form:new FormData(),
                
                });
                preloadCategories();
            }
        });
    };


    const preloadCategories =()=> {
        getAllCategories().then(data =>{
            if(data.error){
                setValues({...values , error:data.error});
            }else{
                setValues ({
                    categories:data,formData:new FormData()
                })
            }
        })
    }



    useEffect ( () => {
        preLoad(match.params.productId);
    },[]);


    const createProductForm = () => (
        <form >
          <span>Post photo</span>
          <div className="form-group mb-2 " >
            <label className="btn btn-block btn-success text-center" style={{width:'100%'}}>
              <input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
              />
            </label>
          </div>
          <div className="form-group mb-1">
            <input
              onChange={handleChange("name")}
              name="photo"
              className="form-control"
              placeholder="Name"
              value={name}
            />
          </div>
          <div className="form-group mb-1">
            <textarea
              onChange={handleChange("description")}
              name="photo"
              className="form-control"
              placeholder="Description"
              value={description}
            />
          </div>
          <div className="form-group mb-1">
            <input
              onChange={handleChange("price")}
              type="number"
              className="form-control"
              placeholder="Price"
              value={price}
            />
          </div>
          <div className="form-group mb-1">
            <select
              onChange={handleChange("category")}
              className="form-control"
              placeholder="Category"
            >
              <option>Select a category</option>

              {categories && categories.map((cate , index) =>(
                  <option key={index}value={cate._id}>{cate.name}</option>
              ))}

            </select>
          </div>
          <div className="form-group mb-1">
            <input
              onChange={handleChange("stock")}
              type="number"
              className="form-control"
              placeholder="stock"
              value={stock}
            />
          </div>
          
          <button type="submit" onClick={onSubmit} className="btn btn-outline-success mb-3 mt-2">
            Update Product
          </button>
        </form>
      );


    return (
        <Base title="Add Product here" description="welcome to product creation section" className="container bg-success p-4">
        <Link  to ="/admin/dashboard" className="btn btn-md btn-success mb-2">Admin Home</Link>
        <div className="row bg-dark text-white rounded">
            <div className="col-md-8 offset-md-2">
                {successMessage()}
                {errorMessage()}
                {createProductForm()}
            </div>
        </div>
        </Base>
    );
};


export default UpdateProduct;