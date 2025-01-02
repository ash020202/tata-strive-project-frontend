import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  UtensilsCrossed,
  ClipboardList,
  CalendarRange,
  MessageSquare,
} from "lucide-react";

const AdminSidebar = () => {
  // State to control the bottom nav visibility
  const [isBottomNavOpen, setIsBottomNavOpen] = useState(false);

  return (
    <div className="bg-orange-600 text-white">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col justify-between h-[100dvh] p-4">
        <div>
          <div className="mb-8 text-2xl font-bold">Admin</div>
          <nav className="space-y-2">
            <NavLink
              to="/admin/add-food"
              className={({ isActive }) =>
                `flex items-center space-x-2 p-2 rounded hover:bg-orange-700 ${
                  isActive ? "bg-orange-700" : ""
                }`
              }
            >
              <UtensilsCrossed size={20} />
              <span>Foods</span>
            </NavLink>
            <NavLink
              to="/admin/all-orders"
              className={({ isActive }) =>
                `flex items-center space-x-2 p-2 rounded hover:bg-orange-700 ${
                  isActive ? "bg-orange-700" : ""
                }`
              }
            >
              <ClipboardList size={20} />
              <span>Orders</span>
            </NavLink>
            <NavLink
              to="/admin/reservations"
              className={({ isActive }) =>
                `flex items-center space-x-2 p-2 rounded hover:bg-orange-700 ${
                  isActive ? "bg-orange-700" : ""
                }`
              }
            >
              <CalendarRange size={20} />
              <span>Reservations</span>
            </NavLink>
            <NavLink
              to="/admin/contacts"
              className={({ isActive }) =>
                `flex items-center space-x-2 p-2 rounded hover:bg-orange-700 ${
                  isActive ? "bg-orange-700" : ""
                }`
              }
            >
              <MessageSquare size={20} />
              <span>Contacts</span>
            </NavLink>
          </nav>
        </div>

        <NavLink
          to="/"
          className="flex items-center justify-center p-2 text-white bg-orange-700 rounded shadow-md"
        >
          Home
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 ml-2 mt-0.5 text-center"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v13.5a2.25 2.25 0 002.25 2.25h6.75a2.25 2.25 0 002.25-2.25V15m-3-3h8.25m0 0l-3-3m3 3l-3 3"
            />
          </svg>
        </NavLink>
      </div>

      {/* Mobile Bottom Nav */}
      <div
        className={`md:hidden transition-all fixed bottom-[95px] right-10 rounded w-fit h-fit bg-gray-800 text-white p-4 flex flex-col justify-around z-30 ${
          isBottomNavOpen ? "flex translate-x-0" : "translate-x-[500px]"
        }`}
      >
        <NavLink
          to="/admin/add-food"
          className={({ isActive }) =>
            `flex items-center space-x-2 p-2 rounded hover:bg-orange-700 ${
              isActive ? "bg-orange-700" : ""
            }`
          }
        >
          <UtensilsCrossed size={20} />
          <span>Foods</span>
        </NavLink>
        <NavLink
          to="/admin/all-orders"
          className={({ isActive }) =>
            `flex items-center space-x-2 p-2 rounded hover:bg-orange-700 ${
              isActive ? "bg-orange-700" : ""
            }`
          }
        >
          <ClipboardList size={20} />
          <span>Orders</span>
        </NavLink>
        <NavLink
          to="/admin/reservations"
          className={({ isActive }) =>
            `flex items-center space-x-2 p-2 rounded hover:bg-orange-700 ${
              isActive ? "bg-orange-700" : ""
            }`
          }
        >
          <CalendarRange size={20} />
          <span>Reservations</span>
        </NavLink>
        <NavLink
          to="/admin/contacts"
          className={({ isActive }) =>
            `flex items-center space-x-2 p-2 rounded hover:bg-orange-700 ${
              isActive ? "bg-orange-700" : ""
            }`
          }
        >
          <MessageSquare size={20} />
          <span>Contacts</span>
        </NavLink>
        <NavLink
          to="/"
          className="flex items-center space-x-2 p-2 text-white md:bg-orange-700 hover:bg-orange-700 rounded shadow-md"
        >
        
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 text-center"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v13.5a2.25 2.25 0 002.25 2.25h6.75a2.25 2.25 0 002.25-2.25V15m-3-3h8.25m0 0l-3-3m3 3l-3 3"
            />
          </svg>
          <span> Home</span>
         
        </NavLink>
      </div>

      {/* Burger Icon for Mobile */}
      <div
        className="md:hidden fixed bottom-6 right-4 bg-orange-600 p-4 rounded z-40 cursor-pointer flex flex-col gap-[4px]"
        onClick={() => setIsBottomNavOpen(!isBottomNavOpen)}
      >
       
        <span className={`${isBottomNavOpen? "rotate-45 relative top-[6px] " : ""} w-6 h-[2px] bg-white transition-all`}></span>
        <span className={`${isBottomNavOpen ? "h-0 w-0" : "w-6"} h-[2px] bg-white transition-all`}></span>
        <span className={`${isBottomNavOpen? "-rotate-45 relative bottom-[4px] top[-6px]" : ""} w-6 h-[2px] bg-white transition-all`}></span>
      </div>
    </div>
  );
};

export default AdminSidebar;
