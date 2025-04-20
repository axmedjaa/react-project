import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router";
const Products = () => {
  const location = useLocation();
  const Navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const SearchTerm = query.get("search") || "";
  const [active, setActive] = useState("all");
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState(SearchTerm);
  const [visibleCount, setVisibleCount] = useState(10);
  const categoryTags = [
    "all",
    "Breakfast",
    "Brunch",
    "Lunch",
    "Dinner",
    "Snack",
    "drink",
    "fast food",
  ];
  useEffect(() => {
    fetchItams();
  }, []);
  useEffect(() => {
    setVisibleCount(10);
  }, [active, search]);
  const fetchItams = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.from("add").select("*");
      if (error) throw error;
      setItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const filterItems = items.filter((item) => {
    const matchCategory =
      active === "all" ||
      (item.tags &&
        item.tags.toString().toLowerCase().includes(active.toLowerCase()));
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });
  const visibleitems = filterItems.slice(0, visibleCount);
  if(isLoading){
    return(
    <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
</div>
)
}
  return (
    <div className="min-h-screen py-6 px-4 bg-gradient-to-r from-white to-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* search */}
        <div className="flex justify-center items-center">
          <input
            type="text"
            placeholder="search for itmes"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-[70%] px-4 py-2 border border-gray-300 rounded-full shadow-sm mb-2 focus:ring-2 
        focus:ring-gray-400 focus:outline-none"
          />
        </div>
        {/* filter */}
        <div className="flex justify-center  items-center mb-8">
          <div className="flex flex-wrap gap-2  justify-center">
            {categoryTags.map((tag, index) => (
              <span
                onClick={() => setActive(tag)}
                className={`text-lg px-4 py-2 rounded-full shadow-sm cursor-pointer 
              ${active === tag ? "bg-yellow-400" : "bg-white hover:bg-gray-200"}
              `}
                key={index}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        {/* protects */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4">
            {visibleitems.map((item) => (
              <Link
                className="bg-white p-4 rounded-lg shadow hover:shadow-md hover:scale-105 
                transform transition-transform duration-300 hover:transition-all"
                to={`/product/${item.id}`}
                key={item.id}
              >
                <img
                  className="w-full h-50 object-cover rounded-md mb-2"
                  src={item.image_url}
                  alt={item.name}
                />
                <div className="flex justify-between ">
                <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
                <p>${item.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        {/* visible */}
        {filterItems.length > visibleCount && (
          <div className="text-center mt-6">
            <button
              className="px-6 py-2 bg-yellow-400 hover:bg-yellow-500 rounded-full shadow"
              onClick={() => setVisibleCount((prev) => prev + 10)}
            >
              load more
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
