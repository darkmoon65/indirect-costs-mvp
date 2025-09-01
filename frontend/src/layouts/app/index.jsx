import { Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar";
import { PlantaProvider } from "../../contexts/Planta";
const AppLayout = () => {
  return (
    <PlantaProvider>
      <main className="w-full h-screen bg-gray-200 flex">
        <Sidebar />
        <div className="ml-[250px]">
          <Outlet />
        </div>
      </main>
    </PlantaProvider>
  );
};

export default AppLayout;
