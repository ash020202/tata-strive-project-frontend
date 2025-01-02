import { ReservationFormData } from '../validations/reservation.schema';
import axios from './api';


export const createReservation = async (reservationData: ReservationFormData): Promise<any> => {
    try {
        
        const response = await axios.post('/user/reserve-table', reservationData);
        // console.log(response.data);
        return response.data;
    } catch (error: any) {
        throw error.response?.data?.message || 'Reservation failed';
    }
};