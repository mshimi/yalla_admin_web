import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import LoginPage from "../../features/authentication/pages/LoginPage";
import HomePage from "../../features/authentication/pages/HomePage";
import CountryPage from "../../features/core/country/pages/CountryPage";
import CityPage from "../../features/core/city/pages/CityPage";
import AreaPage from "../../features/core/area/pages/AreaPage";
import HotelPage from "../../features/core/hotel/pages/HotelPage";

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
          <HomePage/>
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <div>DashBoard</div> },
        {
          path: "core",
          element: <Outlet/>,
          
          children: [
              {  index:true, element: <Navigate to="countries" replace /> },
            {  path: "countries", element: <CountryPage/>  },
            { path: "cities", element: <CityPage/> },
            { path: "areas", element: <AreaPage/> },
            { path: "hotels", element: <HotelPage/> },
          ],
        },
      ],
    },
  ]
  ,
  {
    future: {
      v7_relativeSplatPath: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_fetcherPersist: true,
      v7_skipActionErrorRevalidation: true,
  
      },
  }
  
  );
  
  export default router;
  