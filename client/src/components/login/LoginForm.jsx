import React, { useState, useContext } from "react";
import { authUser } from "../authorization/authUser";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const { setToken, loggedIn, setLogggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_URL}/api/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: loginEmail, password: loginPassword }),
    })
      .then((response) => response.json())
      .then((data) => {
        setToken(data.accessToken),
          authUser(data.accessToken, setLogggedIn, navigate);
        if (checkbox) {
          localStorage.setItem("token", data.accessToken);
        }
      })
      .catch((err) => console.log(err));
    setLoginEmail("");
    setLoginPassword("");
    setCheckbox(false);
  };

  return (
    <section className="flex flex-col border rounded shadow p-4 w-1/2 items-center self-center mt-10">
      {loggedIn?.status === "success" ? (
        <button>Log Out</button>
      ) : (
        <section className="leading-8" >
          <h2 className="text-lg font-semibold">Login</h2>
          <form className="flex flex-col items-start" onSubmit={(e) => handleLogin(e)}>
            <label htmlFor="email_input">Email</label>
            <input
              className="border rounded shadow-inner px-1 py-1"
              placeholder={"email"}
              id={"email_input"}
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <label htmlFor="password_input">Password</label>
            <input
              className="border rounded shadow-inner px-1 py-1"
              type="password"
              placeholder={"password"}
              id={"password_input"}
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <div className="flex flex-row">
            <span className="p-2">Remember me</span>
            <input
              value={checkbox}
              onChange={() => setCheckbox(!checkbox)}
              type="checkbox"
            />
            </div>
            <input
              className="cursor-pointer self-center mt-3 p-2 rounded-full bg-[#C8B8B4] text-white ease-in-out duration-300 hover:bg-white hover:text-black shadow"
              type={"submit"}
            />
          </form>
        </section>
      )}
    </section>
  );
};

export default LoginForm;
