export const authUser = (token, setLogggedIn) => {
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

    const requestOptions = {
        method: 'GET',
        headers: headers,
        redirect:'follow'
    };
    console.log(requestOptions, 'in authuser function')

    fetch('http://localhost:8080/api/user', requestOptions)
        .then(response => response.json())
        .then(result => {console.log(result); setLogggedIn(result.body.message)})
        .catch(error => console.log('error', error));
}