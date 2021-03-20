import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import * as actions from '../../../store/actions';
import { FaRegUserCircle } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';

const Navigator = () => {
    const history = useHistory();
    const user = useSelector(state => state.users.user);

    const dispatch = useDispatch();
    const onLogout = useCallback(() => {
        dispatch(actions.logout());
        history.push(`/`);
    },[dispatch, history]);
 

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
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
            <div inline="true">
                {/* TODO: [MT-1]  */}
                <NavDropdown alignRight title={<FaRegUserCircle />} id="basic-nav-dropdown"> 
                    {   !user
                        ? <NavDropdown.Item href="/user/login">Login</NavDropdown.Item>
                        : <NavDropdown.Item href="/user/manage">Manage</NavDropdown.Item>
                    }
                    <NavDropdown.Divider />
                    {   !user 
                        ?  <NavDropdown.Item href="/user/registrer">Registrer</NavDropdown.Item>
                        :  <NavDropdown.Item href="" onClick={() => onLogout()}>Log Out</NavDropdown.Item>

                    }
                </NavDropdown>
            </div>
        </Navbar>
    )
};

export default Navigator

