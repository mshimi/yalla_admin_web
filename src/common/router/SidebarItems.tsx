import { BiChild, BiListCheck, BiSolidTimer } from "react-icons/bi"
import {
  BsAirplane,
  BsBackpack,
  BsBuildings,
  BsBusFront,
  BsCurrencyDollar,
  BsGeoAlt,
  BsGlobe,
  BsHouse,
  BsHouseDoor,
} from "react-icons/bs"
import { FaBookOpen } from "react-icons/fa"
import { AiOutlineExperiment } from "react-icons/ai"
import { MdCategory } from "react-icons/md"
import { GiPalmTree } from "react-icons/gi"

const SidebarItems: SidebarItem[] = [
  {
    icon: <BsHouse />,
    label: "Dashboard",
    path: "/",
  },
]

export const Items: SidebarHeaderInterface[] = [
  {
    label: "Main",
    children: [
      {
        icon: <BsHouse />,
        label: "Dashboard",
        path: "/",
      },
    ],
  },
  {
    label: "Configuration",
    children: [],
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
    label: "Transfer",
    children: [
      {
        icon: <BsBusFront />,
        label: "Vehicles",
        path: "transfer/vehicles",
      },
      {
        icon: <BsBackpack />,
        label: "Extras",
        path: "transfer/extras",
      },
      {
        icon: <BiSolidTimer />,
        label: "Release",
        path: "transfer/release",
      },
      {
        icon: <BiChild />,
        label: "Child Policies",
        path: "transfer/childpolicy",
      },
      {
        icon: <BsCurrencyDollar />,
        label: "Rates",
        path: "transfer/rates",
      },
      {
        icon: <AiOutlineExperiment />,
        label: "Test Booking",
        path: "transfer/testbooking",
      },
    ],
  },
  {
    label:"Excursion",
    children: [
      {
        icon: <GiPalmTree />,
        label: "Excursions",
        path: "excursion/excursions",
      },
      {
        icon: <MdCategory />,
        label: "Categories",
        path: "excursion/categories",
      },
      {
        icon: <BiListCheck />,
        label: "Excursion Items",
        path: "excursion/items",
      },
    ]
  }
]

export interface SidebarHeaderInterface {
  children: SidebarItem[]
  label: string
  onlyAdmin?: boolean
}

export interface SidebarItem {
  icon: React.ReactNode
  label: string
  path: string
  onlyAdmin?: boolean
}

export default SidebarItems
