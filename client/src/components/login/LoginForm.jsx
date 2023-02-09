import React, { useState } from 'react'
import { authUser } from '../authorization/authUser'

const LoginForm = () => {
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loggedIn, setLogggedIn] = useState()

  const handleLogin = (e) => {
    e.preventDefault()
    fetch('http://localhost:8080/api/user/login', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: loginEmail, password: loginPassword })
    })
    .then(response => response.json())
    .then(data => authUser(data.accessToken, setLogggedIn))
    .catch(err => console.log(err))
    setLoginEmail('')
    setLoginPassword('')
  }

  return (
      <>
        
        {loggedIn === 'success' ? <button>Log Out</button> : <section><h3>Login</h3><form onSubmit={(e) => handleLogin(e)} className={"login_form"}>
          <label htmlFor="email_input">Email</label>
          <input placeholder={"email"} id={"email_input"} value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)}/>
          <br/>
          <label htmlFor="password_input">Password</label>
          <input type='password' placeholder={"password"} id={"password_input"} value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)}/>
          <br/>
          <input type={'submit'}/>
        </form></section>}
        
      </>
  )
}

export default LoginForm;