import {  BsBuildings, BsGeoAlt, BsGlobe, BsHouse, BsHouseDoor } from "react-icons/bs";

const SidebarItems:SidebarItem[] = [
    {
        icon: <BsHouse />,
        label: "Dashboard",
        path: "/",
    },
   
];


export const Items : SidebarHeaderInterface[] = [
    {
        label: "Main",
        children: [
            {
                icon: <BsHouse />,
                label: "Dashboard",
                path: "/",
            },
        ]
    },
    {
        children: [
            {
                icon: <BsGlobe />,
                label: "Countries",
                path: "core/countries",
                
            },
            {
                icon: <BsBuildings />,
                label: "Cities",
                path: "core/cities",
                
            },
            {
                icon: <BsGeoAlt />,
                label: "Areas",
                path: "core/areas",
                
            },
            {
                icon: <BsHouseDoor />,
                label: "Hotels",
                path: "core/hotels",
                
            },
           ],
        label: "Core",
    },
];


export interface SidebarHeaderInterface {
    children: SidebarItem[];
    label: string;
    onlyAdmin?: boolean ;
}

export interface SidebarItem {
    icon: React.ReactNode;
    label: string;
    path: string;
    onlyAdmin?: boolean ;
}

export default SidebarItems;