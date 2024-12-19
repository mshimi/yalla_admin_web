import type React from 'react';
import { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { logout, selectUser } from '../../../features/authentication/states/AuthSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import './UserControllersDropDownStyle.css';


const UserControllsDropDown:React.FC = () => {

    
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => setShowMenu(!showMenu);

    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();

    if (user !== null) {
      return (
        <Dropdown
          show={showMenu}
          onToggle={(isOpen) => setShowMenu(isOpen)}
          className="ms-3 position-relative" // Ensure proper positioning
        >
          <Dropdown.Toggle
            variant="link"
            className="p-0"
            id="dropdown-basic"
            onClick={toggleMenu}
            bsPrefix="custom-dropdown-toggle"
            style={{
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              textAlign: "center",
              fontSize: "1rem",
              fontWeight: "bold",
              color: "#fff",
              backgroundColor: "#007bff",
            }}
          >
            {user.firstName[0].toUpperCase() + user.name[0].toUpperCase()}
          </Dropdown.Toggle>
  
          <Dropdown.Menu
            align="end"
            className="shadow dropdown-menu-custom" // Add a custom class for styling
            style={{
              position: "absolute",
              top: "100%", // Dropdown appears below the toggle
              right: 0, // Align the dropdown to the right edge of the button
              zIndex: 1050,
            }}
          >
            <Dropdown.Item href="#profile">Profile</Dropdown.Item>
            <Dropdown.Item href="#settings">Settings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={() => dispatch(logout())}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );
    }
  
    return null;
  };


export default UserControllsDropDown;