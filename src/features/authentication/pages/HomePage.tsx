import { Outlet } from "react-router-dom";
import AppNavbar from "../../../common/components/navbar/Navbar";
import Sidebar from "../../../common/components/sidebar/Sidebar";
import { Button, Container, Nav, Navbar, Offcanvas, Stack } from "react-bootstrap";
import { useState } from "react";
import "./HomePageStyle.css";
import logo2 from "../../../assets/logo2.png";
import { BiMenu } from "react-icons/bi";
import UserControllsDropDown from "../../../common/components/navbar/UserControllsDropDown";
import { Items } from "../../../common/router/SidebarItems";
import SidebarGroup from "../../../common/components/sidebar/SidebarGroup";


const HomePage:React.FC = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleCloseOffcanvas = () => setShowOffcanvas(false);
  const handleShowOffcanvas = () => setShowOffcanvas(true);
  return (
 
<Container fluid className="p-0">
  {/* Navbar */}
  
  <Navbar
  expand="lg"
  className="bg-body-tertiary border-bottom shadow-sm"
  bg="light"
  variant="light"
  style={{ height: "56px", zIndex: 1040 }}
>
  <Container fluid className="d-flex align-items-center">
    {/* Menu Button for Small Screens */}
    <Button className="d-lg-none me-3" variant="outline-primary" onClick={handleShowOffcanvas}>
      <BiMenu />
    </Button>

    {/* Logo and Brand */}
    <Navbar.Brand href="/" className="d-flex align-items-center">
      <img
        src={logo2}
        alt="Logo"
        className="d-inline-block align-top me-2"
        style={{
          height: "40px",
          width: "40px",
          objectFit: "cover",
          borderRadius: "50%",
        }}
      />
      <span className="ms-2">Yalla Reisen</span>
    </Navbar.Brand>

    {/* Spacer for alignment */}
    <div className="flex-grow-1"></div>

    {/* Nav Items */}
    <Nav className="d-flex align-items-center">
      <UserControllsDropDown />
    </Nav>
  </Container>
</Navbar>
  {/* Main layout */}
  <Container fluid className="d-flex">
    {/* Offcanvas */}
    <Offcanvas show={showOffcanvas} onHide={handleCloseOffcanvas} responsive="lg"  style={{
    maxWidth: "65vw", // 75% of the viewport width
  }}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>App Menu</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
      <Nav className={`flex-column ${false ? 'text-center py-3 ' : 'pt-3 px-2'}`}>
        {!false && (
          <Nav.Item className="mb-3 d-none d-lg-block">
            <h5>Pages</h5>
          </Nav.Item>
        )}


        {
          Items.map((item) => (
            

           <SidebarGroup key={item.label} item={item}  /> 
          
            
          ))
        }

      </Nav>
      </Offcanvas.Body>
    </Offcanvas>

    {/* Scrollable content */}
    <Container fluid className="p-1 scrollable-container">
      <Outlet />
    </Container>
  </Container>
</Container>
   
  );
};

export default HomePage;