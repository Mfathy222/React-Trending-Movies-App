import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Movies from './components/Movies/Movies';
import Tvshows from './components/Tvshows/Tvshows';
import People from './components/People/People';
import Details from './components/Details/Details';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Notfound from './components/Notfound/Notfound';
import { useState } from 'react';
import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';
import { TrendingMoviesProvider } from './components/ApiStore';

function App() {
  //auth
const [userData,setUserData]=useState(null);
let navigate=useNavigate();
function SaveUserData(){
  let encodedToken=localStorage.getItem('userToken');
  let decodedToken=jwtDecode(encodedToken);
  setUserData(decodedToken);
}
//logout
function logout(){
  localStorage.removeItem('userToken');
  setUserData(null);
  navigate('/Login');

};
// handle refresh after login 
useEffect(() => {
 if(localStorage.getItem("userToken")!=null){
  SaveUserData();
 }
}, []);

function ProtectedRoute(props){
  if(localStorage.getItem("userToken")==null){
//goto login

return <Navigate to={'/Login'}/>

  }else{
// gotonext comp

return props.children;

  }
};

  return (
    <>
<TrendingMoviesProvider>
    <Navbar userData={userData} logout={logout}/>
    <div className="container">
<Routes>
  <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}></Route>
  <Route path='/Home' element={ <ProtectedRoute><Home/></ProtectedRoute>}></Route>
  <Route path='/Movies' element={ <ProtectedRoute><Movies/></ProtectedRoute>}></Route>
  <Route path='/Tvshows' element={ <ProtectedRoute><Tvshows/></ProtectedRoute>}></Route>
  <Route path='/People' element={ <ProtectedRoute><People/></ProtectedRoute>}></Route>
  <Route path='/Details' element={ <ProtectedRoute><Details/></ProtectedRoute>}></Route>
  <Route path='/Login' element={<Login SaveUserData={SaveUserData}/>}></Route>
  <Route path='/Signup' element={<Signup/>}></Route>
  <Route path='*' element={<Notfound/>}></Route>
</Routes>
    </div>
</TrendingMoviesProvider>  
    </>
  );
}

export default App;
