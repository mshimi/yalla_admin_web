import { Nav } from 'react-bootstrap';
import './SideBarStyle.css';

import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import SidebarGroup from './SidebarGroup';
import { useEffect, useState } from 'react';
import { Items } from '../../router/SidebarItems';


const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setCollapsed(true); // Always collapse on small screens
      }
    };

    handleResize(); // Run on initial render
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

 

  return (
    <div
      className={`d-flex flex-column bg-light border-end ${
        collapsed ? 'collapsed-sidebar' : 'expanded-sidebar'
      }`}
      style={{
        height: 'calc(100vh - 56px)',
        overflowY: 'auto',
        transition: 'all 0.3s ease',
      }}
    >
      <Nav className={`flex-column ${collapsed ? 'text-center py-3 ' : 'pt-3 px-2'}`}>
        {!collapsed && (
          <Nav.Item className="mb-3">
            <h5>Pages</h5>
          </Nav.Item>
        )}


        {
          Items.map((item) => (
            

           <SidebarGroup key={item.label} item={item} collapsed={collapsed} /> 
          
            
          ))
        }

      </Nav>

      {/* Collapsible Button */}
      <div
        className={` d-none d-md-block border-top mt-auto ${collapsed ? 'text-center px-1 py-1' : 'text-end px-3 py-1'}`}
        style={{ cursor: 'pointer' }}
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <BsArrowRight size={20} /> : <BsArrowLeft size={24} />}
      </div>
    </div>
  );
};

export default Sidebar;