import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

const Navigator = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">My Media Tracker</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavDropdown title="Manage" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/manage/paths">Paths (Folders)</NavDropdown.Item>
                        <NavDropdown.Item href="/manage/statuses">Statuses</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/manage/scanner">Scanner</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="/series">Series</Nav.Link>
                    <Nav.Link href="/wanted">Wanted</Nav.Link>
                    <Nav.Link href="/calander">Calander</Nav.Link>
                    {/* <Nav.Link href="#wanted">Activity</Nav.Link> */}
                    {/* <Nav.Link href="#wanted">Watch List</Nav.Link> */}
                    {/* <Nav.Link href="#wanted">Movies</Nav.Link> */}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
};

export default Navigator

