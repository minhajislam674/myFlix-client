import React, {useState} from "react";
import axios from "axios";

export function UserInfo() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');


    let user = localStorage.getItem('user');
    let token = localStorage.getItem('token');
        axios.get(`https://api-thisismyflix.herokuapp.com/users/${user}`, 
        { headers: { Authorization: `Bearer ${token}` } })
        // then call props.onLoggedIn(username)
        .then(response => {
            setUsername(response.data.Username);
            setEmail(response.data.Email)
        })
        .catch(e => {
            console.log("No such user")

        });


    return (
        <>
            <h1> User Information</h1>
            <p>Username: {username} </p>
            <p>Email: {email} </p>
        </>
    )
}