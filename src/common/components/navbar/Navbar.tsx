import type React from 'react';
import { Navbar, Container, Form, FormControl, Button, Nav, Dropdown, Offcanvas } from 'react-bootstrap';
import { BsSun } from 'react-icons/bs';
import logo2 from "../../../assets/logo2.png";
import { useState } from 'react';
import UserControllsDropDown from './UserControllsDropDown';
import Sidebar from '../sidebar/Sidebar';
import SideBarElements from '../sidebar/SideBarElements';

const AppNavbar: React.FC = () => {

  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleCloseOffcanvas = () => setShowOffcanvas(false);
  const handleShowOffcanvas = () => setShowOffcanvas(true);

  return (
    <Navbar bg="light" variant="light" fixed="top" className="border-bottom shadow">
      <Container fluid>

      <Button className="d-none" variant="outline-primary" onClick={handleShowOffcanvas}>
          Menu
        </Button>

        {/* Brand */}
        <Navbar.Brand href="/">
          <div className="d-flex align-items-center">
            <img
              src={logo2}
              alt="Logo"
              className="d-inline-block align-top me-2"
              style={{ height: "40px", width: "40px", objectFit: "cover", borderRadius: "50%" }}
            />
            <span className="ms-2">Yalla Reisen</span>
          </div>
        </Navbar.Brand>

       

        {/* Icons on the Right */}
        <Nav className="d-flex align-items-center">
       <UserControllsDropDown />
        </Nav>
      </Container>
      
      
    </Navbar>
  );
};

export default AppNavbar;