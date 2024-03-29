import React, { useState } from 'react'

const NewUserForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState('user')
  const [postID, setPostID] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (confirmPassword === password) {
    fetch(`${import.meta.env.VITE_URL}/api/user/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password: password, role: role })
    })
        .then(response => response.json())
        .then(data => setPostID(data.body.id))
        .catch(err => console.log(err))
        setEmail('')
        setPassword('')
        setConfirmPassword('')
        setRole('user')
    } 
    return
  }

  return (
    <section className="flex flex-col border rounded shadow p-4 w-3/4 sm:w-1/2 items-center self-center mt-10">
      <h3>Register</h3>
      <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col items-start">
        <label htmlFor="email_input">Email</label>
        <input className="border rounded shadow-inner px-1 py-1" required placeholder={"email"} id={"email_input"} value={email} onChange={(e) => setEmail(e.target.value)}/>
        <br/>
        <label htmlFor="password_input">Password</label>
        <input className="border rounded shadow-inner px-1 py-1" required type='password' placeholder={"password"} id={"password_input"} value={password} onChange={(e) => setPassword(e.target.value)}/>
        <br/>
        <label htmlFor="confirmed_password_input">Confirm password</label>
        <input className="border rounded shadow-inner px-1 py-1" required type='password' placeholder={"confirm password"} id={"confirmed_password_input"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
        <br/>
        <label htmlFor="type_input">Type of User</label>
        <select placeholder={"user"} id={"type_input"} value={role} onChange={(e) => setRole(e.target.value)}>
          <option value={"user"}>User</option>
          <option value={"admin"}>Admin</option>
        </select>
        <br/>
        <input className="cursor-pointer self-center mt-3 p-2 rounded-full bg-[#C8B8B4] text-white ease-in-out duration-300 hover:bg-white hover:text-black shadow" type={'submit'}/>
      </form>
    </section>
)
}

export default NewUserForm