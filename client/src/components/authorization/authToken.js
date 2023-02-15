export const authToken = (token, setLogggedIn) => {
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

    const requestOptions = {
        method: 'GET',
        headers: headers,
        redirect:'follow'
    };

    fetch('http://localhost:8080/api/user', requestOptions)
        .then(response => response.json())
        .then(result => setLogggedIn(result))
        .catch(error => console.log('error', error));
}