import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import { Menu } from "../pages/Menu";
import { Orders } from "../pages/Orders";
import { Profile } from "../pages/Profile";
import { About } from "../pages/About";
import { Contact } from "../pages/Contact";
import { Reservations } from "../pages/Reservations";
import { Checkout } from "../pages/Checkout";
import { IsAdmin, ProtectedRoute } from "./ProtectedRoute";
import AdminLayout from "../components/AdminLayout";
import AdminFoods from "../pages/AdminFoods";
import AdminOrders from "../pages/AdminOrders";
import AdminReservations from "../pages/AdminReservations";
import AdminContacts from "../pages/AdminContacts";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Menu />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "reservations",
        element: <Reservations />,
      },
      {
        path: "orders",
        element: (
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin",
        element: (
          <IsAdmin>
            {" "}
            <AdminLayout />
          </IsAdmin>
        ),
        children: [
          {
            index: true,
            element: <Navigate to="/admin/add-food" />,
          },
          {
            path: "add-food",
            element: <AdminFoods />,
          },
          {
            path:"all-orders",
            element:<AdminOrders/>
          },{
            path:"reservations",
            element:<AdminReservations/>
          },{
            path:"contacts",
            element:<AdminContacts/>
          }
        ],
      },
    ],
  },
]);
