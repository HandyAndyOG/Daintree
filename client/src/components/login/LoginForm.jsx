import React, { useState, useContext } from 'react'
import { authUser } from '../authorization/authUser'
import { UserContext } from '../context/UserContext'
import { useNavigate } from "react-router-dom";


const LoginForm = () => {
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [checkbox, setCheckbox] = useState(false)
  const { setToken, loggedIn, setLogggedIn } = useContext(UserContext)
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault()
    fetch('http://localhost:8080/api/user/login', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: loginEmail, password: loginPassword })
    })
    .then(response => response.json())
    .then(data => { setToken(data.accessToken), authUser(data.accessToken, setLogggedIn, navigate); if(checkbox) {localStorage.setItem("token", data.accessToken)} })
    .catch(err => console.log(err))
    setLoginEmail('')
    setLoginPassword('')
    setCheckbox(false)
  }

  return (
      <>
        {loggedIn?.status === 'success' ? <button>Log Out</button> : <section><h3>Login</h3><form onSubmit={(e) => handleLogin(e)} className={"login_form"}>
          <label htmlFor="email_input">Email</label>
          <input placeholder={"email"} id={"email_input"} value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)}/>
          <br/>
          <label htmlFor="password_input">Password</label>
          <input type='password' placeholder={"password"} id={"password_input"} value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)}/>
          <br/>
          <input value={checkbox} onChange={() => setCheckbox(!checkbox)} type='checkbox'/><span>Remember me</span>
          <input type={'submit'}/>
        </form></section>}
        
      </>
  )
}

export default LoginForm;