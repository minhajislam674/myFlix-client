import React from "react";
import { Navbar, Container, Nav, Button, NavDropdown } from "react-bootstrap";
 
export function Menubar ({user}) {

    const onLoggedOut = () => {
        localStorage.clear(),
        window.open("/", "_self");
        alert("You have been succesfully logged out!")
    }

    const isAuth = () => {
        if (typeof window == "undefined") {
            return false;
        }
        if (localStorage.getItem("token")) {
            return localStorage.getItem("token");
        } else {
            return false;
        }
    };

    return (
        <Navbar sticky="top" collapseOnSelect expand="md" bg="dark" variant="dark">
        <Container>
            <Navbar.Brand href="/">myFlix</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
                {!isAuth() && (
                <Nav.Link href="/">Sign in</Nav.Link>)}
                {!isAuth() && (
                <Nav.Link href="/register">Sign up</Nav.Link>)}
                {isAuth() && (
                <Nav.Link href="/">Movies</Nav.Link>)}
            </Nav>

            <NavDropdown title={user} id="nav-dropdown">
                {isAuth() && (
                    <NavDropdown.Item eventKey="4.1" href={`/users/${user}`}>Profile</NavDropdown.Item>)}
                {isAuth() && (
                    <NavDropdown.Item eventKey="4.3">Favorite Movies</NavDropdown.Item>)} 
                    <NavDropdown.Divider />
                {isAuth() && (
                    <NavDropdown.Item eventKey="4.4" onClick={()=> {onLoggedOut()}}>Logout</NavDropdown.Item>)}
                
            </NavDropdown>
            </Navbar.Collapse>
            
        </Container>
        </Navbar>
    )

}