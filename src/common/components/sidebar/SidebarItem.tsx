import { Col, Nav, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import type { SidebarItem as Item }  from "../../router/SidebarItems";

interface SidebarItemProps {
  item: Item

}

const SidebarItem: React.FC<SidebarItemProps> = ({ item  }) => {

  

  return (
    
    <Nav.Item>
    <NavLink
    onClick={() => {}}
      to={item.path}
      className={({ isActive }) =>
        `nav-link d-flex align-items-center align-baseline ${isActive ? "fw-semibold" : ""}`
      }
      style={({ isActive }) => ({
        color: isActive ? "blue" : "black",
      })}
    >
      {({ isActive }) => (
        
          <Row 
          className="align-baseline"
          
          data-bs-placement="right"
          title={ item.label }
        >
          <Col xs= {3}>
          <span
            className={`me-1 ${isActive ? "text-primary" : ""}`}
            style={{
              fontSize: isActive ? "1rem" : "1rem",
            }}
          >
            {item.icon}
          </span>
          </Col>
          <Col xs= {9}>
          <span
            style={{
              whiteSpace: "nowrap", // Prevent wrapping
              overflow: "hidden", // Hide overflowed text
              textOverflow: "ellipsis", // Add ellipsis if text overflows
            }}

          >{item.label}</span>
          </Col>
          
        </Row>
        
      )}
    </NavLink>
  </Nav.Item>
    );
};

export default SidebarItem;