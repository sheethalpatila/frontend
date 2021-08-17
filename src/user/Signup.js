import React , {useState} from 'react';
import { Link } from 'react-router-dom';
import { signup } from '../auth/helper';
import Base from '../core/Base';



const Signup = () =>{

    const  [values,setVAlues] = useState({
        name:"",
        email:"",
        password:"",
        error:"",
        success:false
    });

    //destructure array 
    const {name,email,password,error,success} =values

//setting values
    const handleChange = name => event =>{
        setVAlues({...values , error:false , [name] : event.target.value})
    };

    //onsubmit click
    const onSubmit = event => {
        event.preventDefault()
        setVAlues ({...values , error:false})
        signup({name,email,password})
        .then( data => {
            if(data.error){
                setVAlues({...values, error:data.error , success:false})
            }
            else{
                setVAlues({...values , 
                    name:"" ,
                    email:"",
                    password:"",
                    error:"",
                    success:true
                }) //setting values so that after submission form values should be empty
            }
        })
        .catch(console.log("Error in signup"))
    }

//signupform component
    const signUpForm = () =>{
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                  <form>
                    <div className="form-group">
                      <label className="text-light">Name</label>
                      <input className="form-control" 
                      onChange={handleChange("name")} 
                      type="text" value={name}/>
                     </div>

                     <div className="form-group">
                      <label className="text-light mt-2">Email</label>
                      <input className="form-control" 
                      onChange={handleChange("email")}
                      type="email" value={email}/>
                     </div>

                     <div className="form-group">
                      <label className="text-light mt-2">Password</label>
                      <input className="form-control" 
                      onChange={handleChange("password")}
                      type="password" value={password} />
                     </div>

                     <button  onClick={onSubmit} className="btn btn-block btn-success mt-3" style={{width:"100%"}}>Submit</button>

                  </form>

                </div>
            </div>
        )
    };

//display and conditions after hitting submit 
const successMassage = () => {
    return (
        <div className="row"> 
            <div className="col-md-6 offset-sm-3 text-left">
                  <div className =" alert alert-success" style={{display:success ? "" : "none"}}> New accout was created successfully . Please <Link to="/signin">Login here</Link>
                 </div>
            </div>
        </div>
)
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


    return (
        <Base title="sign up" description ="page for sign-up!">
       <p className="text-white text-center">{JSON.stringify(values)}</p>
       {successMassage()}
       {errorMassage()}
        {signUpForm()}
        </Base>
    );
};

export default Signup;
