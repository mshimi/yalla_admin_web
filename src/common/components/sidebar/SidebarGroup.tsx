import type { SidebarHeaderInterface } from "../../router/SidebarItems";
import SidebarItem from "./SidebarItem";

 const   SidebarGroup: React.FC<{ item:SidebarHeaderInterface }> = ({ item }) => {

    return (
        <>
           {  <span key={item.label} className='text-body-secondary fw-medium fs-6' >
             {  item.label}
            </span> }
            {item.children.map((child, index) => (
              <SidebarItem
                key={index}
                item={child}
                
              />
            ))}
            </>
    )
};

export default SidebarGroup;