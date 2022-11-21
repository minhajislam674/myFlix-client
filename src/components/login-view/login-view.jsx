import React, {useState} from "react";
import PropTypes from 'prop-types';
import axios from "axios";
import { Link } from "react-router-dom";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



export function LoginView(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Declare hook for each input
    const [usernameErr, setUsernameErr] = useState("");
    const [passwordErr, setPasswordErr] = useState("");

    //Validate user inputs
    const validate =()=> {
    //Declaring the variable isReq and setting it to true.
    //If the conditions are met, set the value in the state to the required string and the variable isReq to false. 
    let isReq = true;
    if(!username) {
        setUsernameErr("Username Required");
        isReq = false;
    } else if (username.length < 2) {
        setUsernameErr("Username must be minimum 2 charachters long");
        isReq = false;
    } if (!password) {
        setPasswordErr("Password required");
        isReq = false;
    } else if (password.length < 6) {
        setPasswordErr("Password must be 6 characters long");
        isReq = false;
    }
    return isReq;
}

const handleSubmit = (e) => {
    // preventing the default behavior of submitting a form
    e.preventDefault(); 
    const isReq = validate();
    if (isReq) {
        // Send a request to the server for authentication
        axios.post('https://api-thisismyflix.herokuapp.com/login/', {
            Username: username,
            Password: password
        })
        // then call props.onLoggedIn(username)
        .then(response => {
            const data = response.data;
            props.onLoggedIn(data);
        })
        .catch(e => {
            console.log("No such user")
        });
    }
};


return (
    <Container> 
        <Row className="d-flex align-items-center justify-content-center">
            <Col md={5}>
                <Form>
                    <h1>Welcome to myFlix</h1>  
                    <h3>Please log in</h3>
                    <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label>Username: </Form.Label>
                    <Form.Control  
                        type="text" 
                        value={username}
                        placeholder="Enter Username" 
                        onChange={ e=> setUsername(e.target.value)} 
                        required /> 
                        {usernameErr && <p>{usernameErr}</p>}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password: </Form.Label>
                    <Form.Control 
                        type="password"
                        value={password}
                        placeholder="Enter Password"
                        onChange={ e=> setPassword(e.target.value)}
                        required /> 
                        {passwordErr && <p>{passwordErr}</p>}
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>

                    <Form.Group>
                        <br/>
                        <Form.Label> New to myFlix? Please register </Form.Label>
                        <Link to="/register"> here!</Link>
                    </Form.Group>
                </Form>
            </Col>
        </Row>
    </Container>


);

}

LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired
}