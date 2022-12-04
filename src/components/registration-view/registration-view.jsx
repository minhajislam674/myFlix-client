import React, {useState} from "react";
import PropTypes from 'prop-types';
import axios from "axios";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export function RegistrationView(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    // Declare hook for each input
    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [emailErr, setEmailErr] = useState('');

    //Validate user inputs
    const validate =()=> {
        //Declaring the variable isReq and setting it to true.
        //If the conditions are met, set the value in the state to the required string and the variable isReq to false. 
        let isReq = true;
        if (!username) {
            setUsernameErr("Username required!");
            isReq = false;
        } else if (username.length < 2) {
            setUsernameErr("Username must be at least 2 characters long!");
            isReq = false;
        }
        if (!password) {
            setPasswordErr("Password required!");
            isReq = false;
        } else if (password.length < 5) {
            setPasswordErr("Your password must be least 6 characters long");
            isReq = false;
        }
        if (!email) {
            setEmailErr("Email required!");
            isReq = false;
        } else if (email.indexOf('@') === -1) {
            setEmailErr("Enter a valid email address");
            isReq = false;
        } 
        return isReq;
    }

const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
        axios.post("https://myflix-movies.onrender.com/users/", {
            Username: username,
            Password: password,
            Email: email
        })
        .then(response => {
            const data = response.data;
            console.log(data);
            alert('Registration successful, now you can log in!');
            window.open('/', '_self');
        })
        .catch(err => {
            console.error(err);
            alert("Unable to register");
        });
    }
};

return (
    <Container>
        <Row className="d-flex align-items-center justify-content-center">
            <Col md={5}>
                <Form>
                    <h1>Welcome to myFlix</h1>  
                    <h6>Please register!</h6>
                    <Form.Group className="mb-3" >
                    <Form.Label>Username: </Form.Label>
                    <Form.Control  
                        type="text" 
                        value={username}
                        placeholder="Enter Username" 
                        onChange={ e=> setUsername(e.target.value)} 
                        required />
                        {usernameErr && <p>{usernameErr}</p>} 
                    </Form.Group>

                    <Form.Group className="mb-3" >
                    <Form.Label>Password: </Form.Label>
                    <Form.Control 
                        type="password"
                        value={password}
                        placeholder="Enter Password"
                        onChange={ e=> setPassword(e.target.value)}
                        required /> 
                        {passwordErr && <p>{passwordErr}</p>}
                    </Form.Group>

                    <Form.Group className="mb-3">
                    <Form.Label>Email: </Form.Label>
                    <Form.Control 
                        type="email"
                        value={email}
                        placeholder="Enter Email"
                        onChange={ e=> setEmail(e.target.value)}
                        required /> 
                        {emailErr && <p>{emailErr}</p>}
                    </Form.Group>
                    <Button className="sign-up-button mt-2 mr-2" variant="primary" type="submit" onClick={handleSubmit}>
                        Submit
                    </Button>
                
                    <Form.Group>
                        <br/>
                        <Form.Label> Already have an account? Log in </Form.Label>
                        <Link to="/"> here!</Link>
                    </Form.Group>
                </Form>


            </Col>
        </Row>
    </Container>
);

}
