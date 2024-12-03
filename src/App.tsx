import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import type React from "react";
import { RouterProvider, useLocation } from 'react-router-dom';
import MyRouter from "./common/router/Router";
import { useEffect } from "react";
import { useAuthQueries } from "./features/authentication/controllers/AuthQueries";
import LandingPage from "./features/authentication/pages/landingpage/LandingPage";


const App:React.FC = () => {

const authQuerires = useAuthQueries();



  const {isLoading,isError,data} = authQuerires.useAuthCheckQuery();

  if(isLoading){
    return <LandingPage/>;
  }


  return (
    <RouterProvider router={MyRouter} />
  
  )
}

export default App
