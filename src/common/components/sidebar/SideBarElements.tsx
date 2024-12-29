import Nav from "react-bootstrap/esm/Nav";
import { Items } from "../../router/SidebarItems";
import SidebarGroup from "./SidebarGroup";

const SideBarElements: React.FC = () => {
    return (
        <>
        <Nav className={`flex-column ${false ? 'text-center py-3 ' : 'pt-3 px-2'}`}>
        {!false && (
          <Nav.Item className="mb-3">
            <h5>Pages</h5>
          </Nav.Item>
        )}


        {
          Items.map((item) => (
            

           <SidebarGroup key={item.label} item={item}  />
          
            
          ))
        }

      </Nav>

        </>
    );
};

export default SideBarElements;