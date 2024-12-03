import type { SidebarHeaderInterface } from "../../router/SidebarItems";
import SidebarItem from "./SidebarItem";

 const   SidebarGroup: React.FC<{collapsed:boolean, item:SidebarHeaderInterface }> = ({ item, collapsed }) => {

    return (
        <>
           { !collapsed ? <span key={item.label} className='text-body-secondary fw-medium fs-6' >
             {  item.label}
            </span> : <></>}
            {item.children.map((child, index) => (
              <SidebarItem
                key={index}
                item={child}
                collapsed={collapsed}
              />
            ))}
            </>
    )
};

export default SidebarGroup;