import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { useRef } from 'react';

const Layout = () => {
  const mainRef = useRef<HTMLDivElement | null>(null);
  return (
    <div className="flex h-dvh w-dvh">
      <AdminSidebar />
      <main
        ref={mainRef}
        className="flex-1 bg-gray-100 h-[100dvh] overflow-y-scroll w-dvw"
      >
        <Outlet context={{ mainRef }} />
      </main>
    </div>
  );
};

export default Layout;
