import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import type { SidebarItem as Item }  from "../../router/SidebarItems";

interface SidebarItemProps {
  item: Item
  collapsed: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ item , collapsed }) => {

  

  return (
    
    <Nav.Item>
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        `nav-link d-flex align-items-center align-baseline ${isActive ? "fw-semibold" : ""}`
      }
      style={({ isActive }) => ({
        color: isActive ? "blue" : "black",
      })}
    >
      {({ isActive }) => (
        <span
          className="align-baseline"
          data-bs-toggle={collapsed ? "tooltip" : ""}
          data-bs-placement="right"
          title={collapsed ? item.label : ""}
        >
          <span
            className={`me-2 ${isActive ? "text-primary" : ""}`}
            style={{
              fontSize: isActive ? "1rem" : "1rem",
            }}
          >
            {item.icon}
          </span>
          {!collapsed && <span>{item.label}</span>}
        </span>
      )}
    </NavLink>
  </Nav.Item>
    );
};

export default SidebarItem;