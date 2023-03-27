export const authUser = (token, setLogggedIn, navigate) => {
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

    const requestOptions = {
        method: 'GET',
        headers: headers,
        redirect:'follow'
    };

    fetch(`${import.meta.env.REACT_APP_URL}/api/user`, requestOptions)
        .then(response => response.json())
        .then(result => { setLogggedIn(result), result.status === 'success' ? navigate('/') : navigate('/login') })
        .catch(error => console.log('error', error));
}