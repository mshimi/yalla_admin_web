import { Outlet } from "react-router-dom";
import AppNavbar from "../../../common/components/navbar/Navbar";
import Sidebar from "../../../common/components/sidebar/Sidebar";


const HomePage:React.FC = () => {
    return (
        <div className="d-flex flex-column" style={{ height: '100vh' }}>
          {/* Navbar */}
          <AppNavbar />
    
          {/* Main Content: Sidebar and Page Content */}
          <div className="d-flex flex-grow-1" style={{ marginTop: '56px' }}>
            {/* Sidebar */}
            <Sidebar />
    
            {/* Main Content Area */}
            <div className="flex-grow-1 p-2 p-md-3 p-xl-4">
              <Outlet />
            </div>
          </div>
        </div>
      );
}

export default HomePage