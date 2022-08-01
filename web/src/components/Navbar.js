import { FormControl, MenuItem, Select } from "@mui/material";
import React, { useState,useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faDoorOpen, faEye ,faEyeSlash, faPersonRifle, faUser} from '@fortawesome/free-solid-svg-icons'
import Cookies from 'js-cookie'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Axios from 'axios'

toast.configure()
function Navbar() {
  const navigate = useNavigate()
  const [error,setError] = useState("")
  const [disabled,setDisabled] = useState(true)
  const [category, setCategory] = useState("Grocery");
  const handleChange = (event) => {
    setCategory(event.target.value);
  };
  const [loggedIn,setLoggedIn] = useState(false)
  const [active,setActive] = useState('1')
  const [passwordShown, setPasswordShown] = useState(false);
  const [eyeSymbol, setEyeSymbol] = useState(faEye)
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [address,setAddress] = useState('')
  function logOut(){
    navigate('/')
    Cookies.remove('userID')
    Cookies.remove('username')
  }
  useEffect(() => {
    const id = Cookies.get('userID')
    console.log(id?.length)
    if(id?.length!=null){
      setLoggedIn(true)
      setDisabled(false)
    }
    else{
      console.log("asd")
      setLoggedIn(false)
      setDisabled(true)
    }
  })
  function handleSubmit(){
    Axios.post('http://localhost:3001/login',{
      username : username,
      password : password
    }).then((response)=>{
      if(response.data.error == false){
        Cookies.set("userID",response.data.data.user_id)
        Cookies.set("username",response.data.data.username)
        setLoggedIn(true)
        setError(response.data.message)
        setDisabled(false)
      }
      else{
        setError(response.data.message)
      }
    })
  }
  function handleRegister(){
    Axios.post('http://localhost:3001/register',{
      username : username,
      password : password,
      address : address,
    }).then((response)=>{
      if(response.data.error==true){
        setError(response.data.message)
      }
      else{
        toast('Account made')
        setActive('1')
      }
    })
  }
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
    if(eyeSymbol == faEye){
      setEyeSymbol(faEyeSlash)
    }
    else if(eyeSymbol == faEyeSlash){
      setEyeSymbol(faEye)
    }
  };
  return (
    <div className="font-Roboto flex justify-around pt-9 top-0">
      <div className="flex gap-4">
        <div className="flex font-bold text-3xl items-center justify-center btn" onClick={()=>navigate("/")}>
          Pick<span className="text-vg-green">Veggies</span>
        </div>
        <FormControl sx={{ width: 150 }}>
          <Select value={category} onChange={handleChange}>
            <MenuItem value={"Grocery"}>Grocery</MenuItem>
            <MenuItem value={"Bakery"}>Bakery</MenuItem>
            <MenuItem value={"Makeup"}>Makeup</MenuItem>
            <MenuItem value={"Bags"}>Bags</MenuItem>
            <MenuItem value={"Clothing"}>Clothing</MenuItem>
            <MenuItem value={"Furniture"}>Furniture</MenuItem>
            <MenuItem value={"Daily Needs"}>Daily Needs</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="flex justify-evenly items-center gap-4 font-light text-gray-500">
        <div>Shops</div>
        <div>Offers</div>
        <div>FAQ</div>
        <div>Contact</div>
        <div className="flex gap-2">
          <button className="btn bg-vg-dark-green text-white font-medium flex items-center justify-center px-3 py-2 rounded" onClick={()=>navigate("/seller")} disabled={disabled}>
            Become a seller
          </button>
          {loggedIn===false &&
          <>
          <div className="btn bg-vg-dark-green text-white font-medium flex items-center justify-center px-3 py-2 rounded" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">
            Join
          </div>
          </>}
          {loggedIn==true &&
          <div className=" px-3 py-2 fw-bold">
            <div class="dropdown">
              <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                {Cookies.get("username")}
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><a class="dropdown-item" href="/transaction">Transactions <FontAwesomeIcon className="text-decoration-none" icon={faCartShopping}/></a></li>
                <li><a class="dropdown-item" href="#">Profile <FontAwesomeIcon className="text-decoration-none" icon={faUser}/></a></li>
                <li><div className="btn btn-white" onClick={logOut}>Logout <FontAwesomeIcon className="text-decoration-none" icon={faDoorOpen}/></div></li>
              </ul>
            </div>
          </div>}
          <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
          <div className="offcanvas-header">
            <div className="h2" id="offcanvasTopLabel">Pick<span className="text-vg-green">Veggies</span></div>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"><AiOutlineClose/></button>
          </div>
          <div className="offcanvas-body">
            {active === '1' && 
            <>
              <div className="h4 mb-3">
              Login
            </div>
            <input type="text" onChange={(e)=>setUsername(e.target.value)} className="form-control ms-1 mb-1 w-75" placeholder="Username"/>
            <div className="input-group  ms-1 mb-2 w-75">
              <input type={passwordShown ? "text" : "password"} onChange={(e)=>setPassword(e.target.value)} className="form-control"
                placeholder="Password" />
              <button className="btn btn-outline-secondary" type="button" onClick={togglePassword}>
                <FontAwesomeIcon icon={eyeSymbol} />
              </button>
            </div>
            <div className="text-black text-center">
              {error}
            </div>
            <div className="d-flex flex-row mt-4 justify-content-between pe-5 me-5">
              <button className="btn btn-outline-secondary shadow bg-success text-white" onClick={handleSubmit}>
                Login
              </button>
              <div className="mt-2">
                or <button className="btn btn-link p-0 text-black" onClick={()=>setActive('2')}>Register</button>
              </div>
            </div>
            </>
            }
            {active==='2'&&
            <>
            <div className="h4 mb-3">
              Register
            </div>
            <input type="text" onChange={(e)=>setUsername(e.target.value)} className="form-control ms-1 mb-1 w-75" placeholder="Username"/>
            <div className="text-center text-danger">
            </div>
            <div className="input-group  ms-1 mb-2 w-75">
              <input type={passwordShown ? "text" : "password"} onChange={(e)=>setPassword(e.target.value)} className="form-control"
                placeholder="Password" />
              <button className="btn btn-outline-secondary" type="button" onClick={togglePassword}>
                <FontAwesomeIcon icon={eyeSymbol} />
              </button>
            </div>
            <input type="text" onChange={(e)=>setAddress(e.target.value)} className="form-control ms-1 mb-1 w-75" placeholder="Address"/>
            <div className="text-danger text-center">
              {error}
            </div>
            <div className="d-flex flex-row mt-4 justify-content-between pe-5 me-5">
              <button className="btn btn-outline-secondary shadow bg-success text-white" onClick={handleRegister}>
                Register
              </button>
              <div className="mt-2">
                or <button className="btn btn-link p-0 text-black" onClick={()=>setActive('1')}>Login</button>
              </div>
            </div>
            </>}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
