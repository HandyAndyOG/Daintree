import React, { useContext } from 'react'
import { UserContext } from './context/UserContext'
import { useNavigate } from 'react-router-dom'

const ProfileBar = () => {
  const { token, loggedIn, setStoreName, storeProducts, setStoreProducts} = useContext(UserContext)
  const navigate = useNavigate()

  const viewStore = () => {
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

    const requestOptions = {
        method: 'GET',
        headers: headers,
        redirect:'follow'
    };

    fetch(`http://localhost:8080/api/store/${loggedIn.uniqueStoreId}`, requestOptions)
        .then(response => response.json())
        .then(result => setStoreName(result))
        .catch(error => console.log('error', error));
    navigate('/admin')
  }

    return (
        <>
            <div className={"login_info"}>
                <h1>Logged in as {loggedIn?.role}</h1>
                {loggedIn?.role === 'admin' ? <button onClick={viewStore}>View Store</button> : ''}
            </div>
        </>
    )
}

export default ProfileBar;