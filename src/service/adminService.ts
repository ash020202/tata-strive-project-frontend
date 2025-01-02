import axios from "./api";
import { Food, Reservation } from "../types";

// Add Food
export const addFood = async (food: Food): Promise<any> => {
  try {
    // console.log("Adding food:", food);
    const response = await axios.post("/admin/add-food", food);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || "Failed to add food";
  }
};



//update food item

export const updateFood = async (foodId: number, updatedFood: Food): Promise<any> => {
  try {
    // console.log("Updating food item:", updatedFood);
    const response = await axios.put(`/admin/${foodId}`, updatedFood);
    // console.log(response.data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || "Failed to update food item";
  }
};

//delete food item
export const deleteFood = async (foodId: number): Promise<any> => {
  try {
    const response = await axios.delete(`/admin/delete/${foodId}`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || "Failed to delete food item";
  }
};



// Get all Fooditems
export const getFoods = async (): Promise<any> => {
  try {
    const response = await axios.get("/admin/food-items");
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || "Failed to fetch foods";
  }
};


//get all orders

export const getAllOrders = async (): Promise<any> => {
  try {
    const response = await axios.get("/admin/orders");
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || "Failed to fetch orders";
  }
};

//get all reservations
export const getAllReservations = async (): Promise<Reservation[]> => {
  try {
    const response = await axios.get("/admin/get-all-reservations");
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || "Failed to fetch reservations";
  }
};

//get all contacts
export const getAllContacts = async (): Promise<any> => {
  try {
    const response = await axios.get("/admin/get-contact-forms");
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || "Failed to fetch contacts";
  }
};