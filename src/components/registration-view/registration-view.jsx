import React, {useState} from "react";
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


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

const handleLogIn = (e) => {
    e.preventDefault();
    props.onLoggedIn();
}

return (
    <Container>
        <Row className="d-flex align-items-center justify-content-center">
            <Col md={5}>
                <Form>
                    <h1>Welcome to myFlix</h1>  
                    <h3>Please sign up</h3>
                    <Form.Group className="mb-3" >
                    <Form.Label>Username: </Form.Label>
                    <Form.Control  
                        type="text" 
                        value={username}
                        placeholder="Enter Username" 
                        onChange={ e=> setUsername(e.target.value)} 
                        required /> 
                    </Form.Group>

                    <Form.Group className="mb-3" >
                    <Form.Label>Password: </Form.Label>
                    <Form.Control 
                        type="password"
                        value={password}
                        placeholder="Enter Password"
                        onChange={ e=> setPassword(e.target.value)}
                        required /> 
                    </Form.Group>

                    <Form.Group className="mb-3">
                    <Form.Label>Email: </Form.Label>
                    <Form.Control 
                        type="email"
                        value={email}
                        placeholder="Enter Email"
                        onChange={ e=> setEmail(e.target.value)}
                        required /> 
                    </Form.Group>
                    <Button className="sign-up-button mt-2 mr-2" variant="primary" type="submit" onClick={handleSubmit}>Register</Button>
                </Form>
                <Button className="sign-up-button mt-2 mr-2" variant="primary" type="submit" onClick={handleLogIn} >Login</Button>
            </Col>
        </Row>
    </Container>
);

}

RegistrationView.propTypes = {
    onRegistration: PropTypes.func.isRequired
}
