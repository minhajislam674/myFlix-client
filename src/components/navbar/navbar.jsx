import React from "react";
import { Navbar, Container, Nav, Button, NavDropdown } from "react-bootstrap";
import './navbar.scss';

 
export function Menubar ({user}) {

    const onLoggedOut = () => {
        localStorage.clear();
        window.open("/", "_self");
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
                {!isAuth() && (
                <Nav.Link href="/">Sign in</Nav.Link>)}
                {!isAuth() && (
                <Nav.Link href="/register">Sign up</Nav.Link>)}
                {isAuth() && (
                <Nav.Link href="/">Movies</Nav.Link>)}
                {isAuth() && (
                <Nav.Link href={`/users/${user}`}>Profile</Nav.Link>)}
                {isAuth() && (
                <Nav.Link onClick={()=> {onLoggedOut()}}>Logout</Nav.Link>)}
            </Nav>
            </Navbar.Collapse>
            
        </Container>
        </Navbar>
    )

}