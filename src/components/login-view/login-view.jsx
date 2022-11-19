import React, {useState} from "react";
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export function LoginView(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
}


return (
    <Container> 
        <Row className="d-flex align-items-center justify-content-center">
            <Col md={5}>
                <Form>
                    <h3>Log in</h3>
                    <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label>Username: </Form.Label>
                    <Form.Control  
                        type="text" 
                        value={username}
                        placeholder="Enter Username" 
                        onChange={ e=> setUsername(e.target.value)} 
                        required /> 
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password: </Form.Label>
                    <Form.Control 
                        type="password"
                        value={password}
                        placeholder="Enter Password"
                        onChange={ e=> setPassword(e.target.value)}
                        required /> 
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>

                </Form>
            </Col>
        </Row>
    </Container>


);

}

// LoginView.propTypes = {
//     onLoggedIn: PropTypes.func.isRequired
// }