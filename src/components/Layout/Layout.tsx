import { Outlet } from "react-router-dom";
import { Header } from "./..";


const Layout: React.FC = () => {

    return (
        <div className="bg-resonBlue h-screen flex flex-col">
            <Header />
            <main className="flex flex-1 overflow-auto sm:max-w-[85%] mx-auto w-full">
                <Outlet />
            </main>
      </div>
    );

};

export default Layout;