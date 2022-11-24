import React, {useState} from "react";
import axios from "axios";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { UserInfo } from "./user-info";


export function UserUpdate(){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [emailErr, setEmailErr] = useState('');

 //Validate user inputs
  const validate =()=> {
    //Declaring the variable isReq and setting it to true.
    //If the conditions are met, set the value in the state to the required string and the variable isReq to false. 
    let isReq = true;

    setUsernameErr(false);
    setPasswordErr(false);
    setEmailErr(false);

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


  //UPDATE USER INFO
  const handleUpdate = (e) => {
      // preventing the default behavior of submitting a form
      e.preventDefault(); 
      const isReq = validate();
      let user = localStorage.getItem('user');
      let token = localStorage.getItem('token');
      if (isReq) {
          // If succesfully validated, send a request to the server to update information using put request
          axios.put(`https://api-thisismyflix.herokuapp.com/users/${user}`, {
              Username: username,
              Password: password,
              Email: email
          }, { headers: { Authorization: `Bearer ${token}` } })
          // then call props.onLoggedIn(username)
          .then(response => {
              const data = response.data;
              localStorage.setItem('user', username);
              alert("Profile information has been updaed!")
              window.open('/register', '_self');
          })
          .catch(e => {
              console.log("No such user")
          });
      }
  };
  //DEREGISTER USER
  const handleDeregister = (e) => {
    e.preventDefault(); 
    let user = localStorage.getItem('user');
    let token = localStorage.getItem('token');
    if (confirm('Are you sure?')) {
      axios.delete(`https://api-thisismyflix.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` } })
        // then call props.onLoggedIn(username)
        .then(response => {
          console.log(response);    
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          alert("Profile has been deleted!")
          window.open('/register', '_self');
        })
        .catch(error => {
            console.log(error)
        });
    };
  }

    return (
      <Container>
        <Row className="d-flex align-items-center justify-content-center">
            <Col md={5}>
                <UserInfo/>
                <h1> Update Information</h1>
                <Form>
                    <Form.Group className="mb-3" >
                    <Form.Label>Username: </Form.Label>
                    <Form.Control  
                        type="text" 
                        value={username}
                        onChange={ e=> setUsername(e.target.value)}  />
                        {usernameErr && <p>{usernameErr}</p>} 
                    </Form.Group>

                    <Form.Group className="mb-3" >
                    <Form.Label>Password: </Form.Label>
                    <Form.Control 
                        type="password"
                        value={password}
                        onChange={ e=> setPassword(e.target.value)}
                        required /> 
                        {passwordErr && <p>{passwordErr}</p>}
                    </Form.Group>

                    <Form.Group className="mb-3">
                    <Form.Label>Email: </Form.Label>
                    <Form.Control 
                        type="email"
                        value={email}
                        onChange={ e=> setEmail(e.target.value)}
                        required /> 
                        {emailErr && <p>{emailErr}</p>}
                    </Form.Group>
                    <Button className="sign-up-button mt-2 mr-2" variant="primary" type="submit" onClick={handleUpdate}>Update</Button>
                </Form>
                <Button className="sign-up-button mt-2 mr-2" variant="warning" type="submit" onClick={handleDeregister}>Delete Account</Button>

            </Col>
        </Row>
      </Container>
  );
  
  }