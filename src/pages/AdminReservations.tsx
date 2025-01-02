import { useEffect, useState } from "react";
import type { Reservation } from "../types";
import { getAllReservations } from "../service/adminService";
import Loader from "../components/common/Loader";


const AdminReservations = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
useEffect(() => {
  const fetchreservations = async () => {
    try {
      const response=await getAllReservations();
      setReservations(response);
       
     } catch (error) {
      setError("Failed to fetch reservations.");
       
     }
     finally {
      setLoading(false);
     }
  }
  fetchreservations();
 
},[]);
 


if(loading) {
  return (
    <div className="flex items-center justify-center h-screen">
      <Loader />
    </div>
  )
}
if(error) {
  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-red-500 text-lg font-semibold capitalize">{error}</p>
    </div>
  )
}
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Table Reservations</h1>

      <div className="grid gap-6">
        {reservations.map((reservation) => (
          <div key={reservation.id} className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Reservation for {reservation.guests} guests
                </h3>
                <div className="space-y-1 text-gray-600">
                  <p>Date: {reservation.date}</p>
                  <p>Time: {reservation.time}</p>
                  <p>Occasion: {reservation.occasion}</p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {reservations.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            No reservations yet
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminReservations;
