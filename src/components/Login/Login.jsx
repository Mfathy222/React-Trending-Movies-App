import React, { useState } from 'react'
import axios from 'axios';
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';


export default function Login(props) {
  let [user,setUser] = useState ({
    email: "",
    password: "",
  });

//errormsg 
let [errormsg,setErrormsg]=useState('');
let[errorsList,setErrorsList]=useState([]);
let[loading,setLoading]=useState(false);

//navigate after sign up
  const navigate=useNavigate();   
  function gotoHome(){
    navigate('/Home')
  }

  //  API integaration
  async function submitFormData(e){
    e.preventDefault(); 
    setLoading(true);
    let validateResponse=validateform();  
    if(validateResponse.error){
      setErrorsList(validateResponse.error.details);
    }else{
      let{data}=await axios.post('https://route-movies-api.vercel.app/signin',user);
      // when success goto login page 
      // console.log(data);
      if(data.message === "success"){
        localStorage.setItem('userToken',data.token);
        // call safeUserData
        props.SaveUserData();
        gotoHome();
      }else{
    
        setErrormsg(data.message);
      }
    }
    setLoading(false);

  };

// joi valdition
function validateform(){
const schema=Joi.object({
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
        <h1>Login</h1>
        {errorsList.map((error,index)=><div key={index} className="alert alert-danger">{error.message}</div>)}
        {errormsg?<div className="alert alert-danger">{errormsg}</div>:''}
  
        <form onSubmit={submitFormData}>
        <div className='input-gp my-2'>
          <label htmlFor="email">Email:</label>
          <input onChange={getformvalue} type="email" className=' form-control' name='email' />
        </div>
        <div className='input-gp my-2'>
          <label htmlFor="password">password:</label>
          <input onChange={getformvalue} type="password" className=' form-control' name='password' />
        </div>
        <button className='btn btn-info' type="submit">
          {loading ? <i className=' fa fa-spinner fa-spin '></i>:"Login" }
        </button>
        
        </form>
      </div>
    </>
  )
}
