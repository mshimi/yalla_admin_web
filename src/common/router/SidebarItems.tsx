import { BiSolidTimer } from "react-icons/bi";
import {
    BsAirplane,
    BsBackpack,
    BsBuildings,
    BsBusFront,
    BsCurrencyDollar,
    BsGeoAlt,
    BsGlobe,
    BsHouse,
    BsHouseDoor
} from "react-icons/bs"

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
        label:"Configuration",
        children:[
            
],
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
            {
                icon: <BsAirplane />,
                label: "Airports",
                path: "core/airports",
                
            },
           ],
        label: "Core",
    },
    {
        label:"Transfer",
        children:[
            {
                icon: <BsBusFront />,
                label: "Vehicles",
                path:"transfer/vehicles",
    },
            {
                icon: <BsBackpack />,
                label: "Extras",
                path:"transfer/extras",
            },
    {
        icon: <BiSolidTimer />,
        label: "Release",
        path:"transfer/release",
},
{
    icon: <BsCurrencyDollar />,
    label: "Rates",
    path:"transfer/rates",
},
],},
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