import React, {useState} from "react";
import PropTypes from 'prop-types';

export function RegistrationView(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onRegistration(username);
}


return (
    <form>
        <h2> Register to myFlix  </h2>
        <label>
            Username: <input type="text" value={username} onChange={ e=> setUsername(e.target.value) } ></input>
        </label>
        <label>
            Password: <input type="password" value={password} onChange={ e=> setPassword(e.target.value) }  ></input>
        </label>
        <label>
            Email: <input type="email" value={email} onChange={ e=> setEmail(e.target.value) }  ></input>
        </label>
        <button type="submit" onClick={handleSubmit}>Register</button>
    </form>
);

}

RegistrationView.propTypes = {
    onRegistration: PropTypes.func.isRequired
}