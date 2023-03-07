import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';



export default function Register() {
  //to set in user
  let [user,setUser] = useState ({
    first_name: "",
    last_name: "",
    age: "",
    email: "",
    password: "",
  });

//errormsg 
let [errormsg,setErrormsg]=useState('');
let[errorsList,setErrorsList]=useState([]);
let[loading,setLoading]=useState(false);

//navigate after sign up
  const navigate=useNavigate();   
  function gotologin(){
    navigate('/login')
  }

  //  API integaration
  async function submitFormData(e){
    e.preventDefault(); 
    setLoading(true);
    let validateResponse=validateform();  
    if(validateResponse.error){
      setErrorsList(validateResponse.error.details);
    }else{
      let{data}=await axios.post('https://route-movies-api.vercel.app/signup',user);
      // when success goto login page 
      if(data.message === "success"){
        gotologin();
      }else{
    
        setErrormsg(data.message);
      }
    }
    setLoading(false);

  };

// joi valdition
function validateform(){
const schema=Joi.object({
first_name:Joi.string().alphanum().required().min(3).max(10),
last_name:Joi.string().alphanum().required().min(3).max(10),
age:Joi.number().required().min(10).max(90),
email:Joi.string().required().email({ tlds: { allow: ['com', 'net'] } }),
password:Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  })
return schema.validate(user,{abortEarly:false});
};


  // get value from form and set in setUser
  function getformvalue(e){
    let myUser= {...user};
    myUser[e.target.name]=e.target.value;
    setUser(myUser);
  };

  return (
    <>
    
        <div className=' my-5 w-50 m-auto'>
        <h1>Sign up</h1>
        {errorsList.map((error,index)=><div key={index} className="alert alert-danger">{error.message}</div>)}
        {errormsg?<div className="alert alert-danger">{errormsg}</div>:''}
  
        <form onSubmit={submitFormData}>
        <div className='input-gp my-2'>
          <label htmlFor="first_name">First Name:</label>
          <input onChange={getformvalue} type="text" className=' form-control' name='first_name' />
        </div>
        <div className='input-gp my-2'>
          <label htmlFor="last_name">Last Name:</label>
          <input onChange={getformvalue}  type="text" className=' form-control' name='last_name' />
        </div>
        <div className='input-gp my-2'>
          <label htmlFor="age">Age:</label>
          <input onChange={getformvalue} type="number" className=' form-control' name='age' />
        </div>
        <div className='input-gp my-2'>
          <label htmlFor="email">Email:</label>
          <input onChange={getformvalue} type="email" className=' form-control' name='email' />
        </div>
        <div className='input-gp my-2'>
          <label htmlFor="password">password:</label>
          <input onChange={getformvalue} type="password" className=' form-control' name='password' />
        </div>
        <button className='btn btn-info' type="submit">
          {loading ? <i className=' fa fa-spinner fa-spin '></i>:"Sign up" }
        </button>
        
        </form>
      </div>
    </>
  )
}
