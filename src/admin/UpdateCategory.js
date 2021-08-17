import React , {useState ,useEffect}   from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import {createCategory ,getCategory,updateCategory ,getAllCategories} from "./helper/adminapicall"

const UpdateCategory = ({match}) => {
    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
  
    const { user, token } = isAuthenticated();
  
    const goBack = () => (
      <div className="mt-5">
        <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
          Admin Home
        </Link>
      </div>
    );

 
  
    const handleChange = name => event=> {
      setError("");
      setName(event.target.value);
    };
  
    const onSubmit = event => {
      event.preventDefault();
      setError("");
      setSuccess(false);
  
      //backend request fired
      updateCategory(match.params.categoryId,user._id, token).then(data => {
        if (data.error) {
          setError(true);
        } else {
          setError(false);
          setSuccess(true);
          setName("");
        }
      });
    };

    const preload = (categoryId) => {
      getCategory(categoryId).then(data => {
        console.log(data);
        if(data.error){
          setError(true)
        }else{
          setError(false);
          setName()
        }
      })
    }
    useEffect ( () => {
      preload(match.params.categoryId);
  },[]);

  
    const successMessage = () => {
      if (success) {
        return <h4 className="text-success">Updated category successfully</h4>;
      }
    };
  
    const warningMessage = () => {
      if (error) {
        return <h4 className="text-success">Failed to update category</h4>;
      }
    };
  
    const myCategoryForm = () => (
      <form>
        <div className="form-group">
          <p className="lead">Enter the category</p>
          <input
            type="text"
            className="form-control my-3"
            onChange={handleChange("name")}
            value={name}
            autoFocus
            required
            placeholder="For Ex. Summer"
          />
          <button onClick={onSubmit} className="btn btn-outline-info">
            Create Category
          </button>
        </div>
      </form>
    );
  
    return (
      <Base
        title="Create a category here"
        description="Add a new category for new tshirts"
        className="container bg-info p-4"
      >
        <div className="row bg-white rounded">
          <div className="col-md-8 offset-md-2">
            {successMessage()}
            {warningMessage()}
            {myCategoryForm()}
            {goBack()}
          </div>
        </div>
      </Base>
    );
  };
  
  export default UpdateCategory;
  