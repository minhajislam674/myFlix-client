import React from "react";
import { Navbar, Container, Nav} from "react-bootstrap";
import './navbar.scss';

 
export function Menubar ({user}) {

    const onLoggedOut = () => {
        localStorage.clear();
        window.open("/", "_self");
    }

    const isLoggedIn = () => {
        if (localStorage.getItem('token')) {
          return localStorage.getItem('token');
        } else {
          return false;
        }
      }

    return (
        <Navbar 
            fixed="top" 
            expand="lg"
            className="navbar"  
            collapseOnSelect
            bg="dark"
            variant="dark">
        <Container>
            <Navbar.Brand href="/">myFlix</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
                {!isLoggedIn() && (
                <Nav.Link href="/">Sign in</Nav.Link>)}
                {!isLoggedIn() && (
                <Nav.Link href="/register">Sign up</Nav.Link>)}
                {isLoggedIn() && (
                <Nav.Link href="/">Movies</Nav.Link>)}
                {isLoggedIn() && (
                <Nav.Link href={`/users/${user}`}>Profile</Nav.Link>)}
                {isLoggedIn() && (
                <Nav.Link onClick={()=> {onLoggedOut()}}>Logout</Nav.Link>)}
            </Nav>
            </Navbar.Collapse>
            
        </Container>
        </Navbar>
    )

}