import React , {useState} from 'react';
import { Link , Redirect} from 'react-router-dom';
import Base from '../core/Base';

import {signin ,authenticate, isAuthenticated } from "../auth/helper"


const Signin = () =>{

    const [values , setValues] = useState({
        email:"praveen@gmail.com",
        password:"praveen123",
        error:"",
        loading:false,
        didRedirect:false
    })

    // destructure 
    const {email , password,error , loading ,didRedirect} = values
    //getting user from authentication
    const {user} = isAuthenticated();

    //handling on change  values
    const handleChange = name => event =>{
        return(
        setValues({...values , error:false , [name] : event.target.value}))
    };
//on submit 

const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true
            });
          });
        }
      })
      .catch(console.log("signin request failed"));
  };

    //jusdging method so  should we have to redirect or not 
    const performRedirect = () =>{
        if(didRedirect){
             
             if(user && user.role === 1){
                  return <Redirect to="/admin/dashboard"/>;//to admin page
             }else {
                   return <Redirect to="/user/dashboard"/>;//to user page
             }  
         }
         if(isAuthenticated()){
             return <Redirect  to="/" />;
         }
    };
    
    //display and conditions after hitting submit 
const loadingMassage = () => {
return(
    loading && (
        <div className="alert alert-info">
            <h2>Loading...</h2>
        </div>
    )
  );
};

//error massage after submit
const errorMassage = () => {
    return (
        <div className="row"> 
            <div className="col-md-6 offset-sm-3 text-left">          
                <div className =" alert alert-danger" style={{display:error ? "" : "none"}}>
                           {error}
                </div>
            </div>
        </div>
     )
};


    const signInForm = () =>{
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                  <form>
                     <div className="form-group">
                      <label className="text-light mt-2">Email</label>
                      <input  onChange={handleChange("email")} className="form-control" type="email" value={email}/>
                     </div>

                     <div className="form-group">
                      <label className="text-light mt-2">Password</label>
                      <input onChange={handleChange("password")} className="form-control" type="password" value={password}/>
                     </div>

                     <button onClick={onSubmit} className="btn btn-block btn-success mt-3" style={{width:"100%"}}>Submit</button>

                  </form>

                </div>
            </div>
        )
    }



    return (
        <Base title="sign in page" description ="page for sign-in!">

        {loadingMassage()}
        {errorMassage()}
        {signInForm()}
        {performRedirect()}
    <p className="text-white text-center ">{JSON.stringify(values)}</p>
        </Base>
    );

};

export default Signin;
