import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Plus, Edit, Trash } from "lucide-react";
import type { Food } from "../types";
import {
  addFood,
  getFoods,
  updateFood,
  deleteFood,
} from "../service/adminService";
import { toast } from "sonner";
import { useOutletContext } from "react-router-dom";
import Loader from "../components/common/Loader";

const AdminFoods = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [editingFood, setEditingFood] = useState<Food | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { mainRef } = useOutletContext<{
    mainRef: React.RefObject<HTMLDivElement>;
  }>();
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await getFoods();
        setFoods(response.data);
      } catch (error) {
        toast.error("Failed to load foods.");
        setError("Unable to Fetch food Items.");
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  useEffect(() => {
    if (showForm && mainRef?.current) {
      mainRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [showForm, mainRef]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Food>();

  const onSubmit = async (data: Food) => {
    try {
      if (editingFood) {
        // Ensure editingFood.id is defined
        if (!editingFood.id) {
          throw new Error("Editing food ID is undefined");
        }

        const updatedFood = { ...data, id: editingFood.id };

        // Safely call the updateFood function with a non-undefined ID
        await updateFood(editingFood.id, updatedFood);
        toast.success("Food updated successfully.");
        // console.log(response);

        // Update the food list in the state
        setFoods(
          foods.map((food) => (food.id === editingFood.id ? updatedFood : food))
        );
        setEditingFood(null);
        // toast.success("Food updated successfully.");
      } else {
        const response = await addFood(data);
        setFoods([...foods, response.data]);
        toast.success("Food added successfully.");
      }
      reset();
      setShowForm(false);
    } catch (error) {
      toast.error(String(error));
    }
  };

  const handleAddFoodClick = () => {
    reset({
      name: "",
      category: "",
      price: 0,
      image: "",
      description: "",
      isAvailable: false,
    }); // Clear form fields
    setEditingFood(null); // Clear editingFood state
    setShowForm(true); // Open the form
  };

  const handleEditClick = (food: Food) => {
    setEditingFood(food); // Set the food to be edited
    reset(food); // Prepopulate the form with food data
    setShowForm(true); // Open the form
  };

  const handleDeleteClick = async (food: Food) => {
    try {
      if (!food.id) {
        toast.error("Invalid food ID.");
        return;
      }
      await deleteFood(food.id);
      // console.log(response);

      toast.success("Food deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete food.");
    }

    setFoods(foods.filter((f) => f.id !== food.id));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 text-lg font-semibold capitalize">{error}</p>
      </div>
    );
  }

  return (
    <div className={`${foods.length === 0 ? "p-0" : "pt-16 p-8"} relative`}>
      {/* Blur Background Overlay */}
      {showForm && (
        <div
          className={`${
            showForm ? "fixed" : ""
          } inset-0 bg-black/50 backdrop-blur-sm z-10`}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white p-6 rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-md w-[70%] z-20"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">Name</label>
                <input
                  {...register("name", { required: "Name is required" })}
                  className="w-full p-2 border rounded"
                />
                {errors.name && (
                  <span className="text-red-500">{errors.name.message}</span>
                )}
              </div>

              <div>
                <label className="block mb-2">Category</label>
                <input
                  {...register("category", {
                    required: "Category is required",
                  })}
                  className="w-full p-2 border rounded"
                />
                {errors.category && (
                  <span className="text-red-500">
                    {errors.category.message}
                  </span>
                )}
              </div>

              <div>
                <label className="block mb-2">Price</label>
                <input
                  type="number"
                  {...register("price", {
                    required: "Price is required",
                    min: 0,
                  })}
                  className="w-full p-2 border rounded"
                />
                {errors.price && (
                  <span className="text-red-500">{errors.price.message}</span>
                )}
              </div>

              <div>
                <label className="block mb-2">Image URL</label>
                <input
                  {...register("image", { required: "Image URL is required" })}
                  className="w-full p-2 border rounded"
                />
                {errors.image && (
                  <span className="text-red-500">{errors.image.message}</span>
                )}
              </div>

              <div className="col-span-2">
                <label className="block mb-2">Description</label>
                <textarea
                  {...register("description", {
                    required: "Description is required",
                  })}
                  className="w-full p-2 border rounded"
                />
                {errors.description && (
                  <span className="text-red-500">
                    {errors.description.message}
                  </span>
                )}
              </div>

              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    {...register("isAvailable")}
                    className="form-checkbox"
                    defaultChecked={editingFood?.isAvailable ?? false}
                  />
                  <span>Available</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
            >
              {editingFood
                ? isSubmitting
                  ? "Updating..."
                  : "Update Food"
                : isSubmitting
                ? "Adding..."
                : "Add Food"}
            </button>
            <button
              type="button"
              onClick={() => {
                reset();
                setShowForm(false);
                setEditingFood(null);
              }}
              className="ml-2 bg-gray-600 px-4 py-2 rounded text-white"
            >
              Cancel
            </button>
          </form>
        </div>
      )}
      <div
        className={`${
          foods.length === 0
            ? "flex items-center justify-center h-screen"
            : "fixed right-0 top-5 px-9 "
        }`}
      >
        <button
          onClick={handleAddFoodClick}
          className="bg-orange-600 text-white px-5 py-2 rounded hover:bg-orange-700 shadow-md"
        >
          {foods.length === 0 ? "Add Food" : <Plus />}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {foods.map((food) => (
          <div key={food.id} className="bg-white p-4 rounded-lg shadow">
            <img
              src={food.image}
              alt={food.name}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <span className="flex justify-between items-start">
              <span>
                <h3 className="text-xl font-semibold capitalize">
                  {food.name}
                </h3>
                <p className="text-gray-600 capitalize line-clamp-2">
                  {food.description}
                </p>
              </span>
              <span
                className={`text-xs font-semibold p-1 rounded ${
                  food.isAvailable
                    ? "text-green-600 bg-green-200"
                    : "text-red-700 bg-red-300"
                }`}
              >
                {food.isAvailable ? "Available" : "Not Available"}
              </span>
            </span>

            <div className="mt-4 flex justify-between items-center">
              <span className="text-lg font-bold">₹{food.price}</span>
              <div className="space-x-2">
                <button
                  onClick={() => {
                    handleEditClick(food);
                  }}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                >
                  <Edit size={20} />
                </button>
                <button
                  onClick={() => handleDeleteClick(food)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminFoods;
