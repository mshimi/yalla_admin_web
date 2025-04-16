import { createBrowserRouter, Navigate, Outlet } from "react-router-dom"
import ProtectedRoute from "./ProtectedRoute"
import PublicRoute from "./PublicRoute"
import LoginPage from "../../features/authentication/pages/LoginPage"
import HomePage from "../../features/authentication/pages/HomePage"
import CountryPage from "../../features/core/country/pages/CountryPage"
import CityPage from "../../features/core/city/pages/CityPage"
import AreaPage from "../../features/core/area/pages/AreaPage"
import HotelPage from "../../features/core/hotel/pages/HotelPage"
import AirportPage from "../../features/core/airport/pages/AirportPage"
import VehiclePage from "../../features/transfer/vehicle/pages/VehiclePage"
import TransferReleasePage from "../../features/transfer/transfer_realease/pages/TransferReleasePage"
import TransferRatePage from "../../features/transfer/transfer_rate/pages/TransferRatePage"
import ExcurstionRatePage from "../../features/excursion/rates/pages/ExcursionRatePage"
import TransferExtraPage from "../../features/transfer/transfer_extra/pages/TransferExtraPage"
import ManageChildrenPoliciesPage from "../../features/transfer/transfer_childrenpolicy/pages/ManageChildrenPoliciesPage"
import TestBookingPage from "../../features/transfer/transfer_testbooking/pages/TestBookingPage"

const router = createBrowserRouter(
  [
    {
      path: "/login",
      element: (
        <PublicRoute>
          <LoginPage></LoginPage>
        </PublicRoute>
      ),
    },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <div>DashBoard</div> },
        {
          path: "core",
          element: <Outlet />,

          children: [
            { index: true, element: <Navigate to="countries" replace /> },
            { path: "countries", element: <CountryPage /> },
            { path: "cities", element: <CityPage /> },
            { path: "areas", element: <AreaPage /> },
            { path: "hotels", element: <HotelPage /> },
            { path: "airports", element: <AirportPage /> },
          ],
        },
        {
          path: "transfer",
          element: <Outlet />,
          children: [
            { index: true, element: <Navigate to="vehicles" replace /> },
            { path: "vehicles", element: <VehiclePage /> },
            { path: "extras", element: <TransferExtraPage /> },
            { path: "release", element: <TransferReleasePage /> },
            { path: "childpolicy", element: <ManageChildrenPoliciesPage /> },
            { path: "rates", element: <TransferRatePage /> },
            { path: "testbooking", element: <TestBookingPage /> },
          ],
        },
        {
          path: "excursion",
          element: <Outlet />,

          children: [
            { index: true, element: <Navigate to="excursion" replace /> },
            { path: "excursion", element: <ExcurstionRatePage /> },
          ],
        },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_fetcherPersist: true,
      v7_skipActionErrorRevalidation: true,
    },
  },
)

export default router
