import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { supabase } from "../lib/supabase";
import { Link } from "react-router";
const ManageAds = () => {
  const [foodItems, setFootItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    fetchfoodItems();
  }, []);
  const fetchfoodItems = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.from("add").select("*");
      if (error) throw error;
      setFootItems(data);
    } catch (error) {
      console.error("Error fetching food items:", error.message);
      setError(error);
      toast.error("Error fetching food items");
    } finally {
      setIsLoading(false);
    }
  };
  const handleDelete= async(id, image_url)=>{
    const confirmDelete=window.confirm("Are you sure you want to delete this item?")
    if(!confirmDelete)return
    try {
      if(image_url){
        const filePath=image_url.split("/").slice(-2).join("/")
        const{error:imageError}=await supabase.storage
        .from('image')
        .remove([filePath])
        if(imageError) throw imageError
      }
      const{error}=await supabase.from('add')
      .delete()
      .eq('id',id)
      if(error)throw error
      setFootItems((prev)=>prev.filter((item)=>item.id!==id))
    } catch (error) {
      console.error("Error deleting item:", error.message);
    toast.error("Failed to delete item.");

    }
  }
  return (
    <div className="min-h-screen bg-white py-4 px-6">
      {/* manage */}
      <div className="max-w-7xl px-4 py-2 bg-gray-100">
        <h1 className="text-2xl sm:text-4xl text-gray-800 font-medium">
          ManageAds
        </h1>
        <p className="text-2xl text-gray-600 mt-3 mb-2">
          Total items: {foodItems.length}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {foodItems.map((item) => (
            <div
              className="bg-white rounded-lg shadow-sm p-4  overflow-hidden hover:shadow-xl mt-2"
              key={item.id}
            >
              <img
                src={item.image_url}
                className="w-full h-48 object-cover"
                alt={item.name}
              />
              <div className="mt-3 flex justify-between gap-2">
                <h3 className="text-sm sm:text-2xl text-gray-600 mb-2">
                  {item.name}
                </h3>
                {/* <p className="text-sm text-gray-600">{item.tags.join(', ')}</p> */}
                <p className="text-orange-600 font-bold">${item.price}</p>
              </div>
              <div className="flex justify-between items-center border-t border-gray-200 py-4">
                <button 
                  onClick={() => handleDelete(item.id, item.image_url)}
                 className='bg-red-500 px-4 py-2 rounded-lg text-sm text-white hover:underline hover:text-red-800"'>
                  delete
                </button>
                <Link
                   to={`/dashboard/ads/${item.id}`}
                  className="bg-blue-500 px-4 py-2 rounded-lg text-sm text-white hover:underline hover:text-blue-800"
                >
                  update
                </Link>
                <Link
                 to={`/product/${item.id}`}
                className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition">
                  view
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageAds;
