import { Link } from "react-router";
import { supabase } from "../lib/supabase";
import { useEffect, useState } from "react";

const Home = () => {
  const [featureItems, setfeatureItems] = useState([]);
  const choose = [
    {
      icon: "🍽️",
      title: "Fresh Ingredients",
      desc: "Only the best for every dish.",
    },
    {
      icon: "⏱️",
      title: "Fast Delivery",
      desc: "Delivered to your door quickly.",
    },
    { icon: "⭐", title: "Top Rated", desc: "Loved by customers like you." },
    { icon: "💳", title: "Easy Payments", desc: "Simple and secure checkout." },
  ];
  useEffect(() => {
    fetchItem();
  }, []);
  const fetchItem = async () => {
    const { data, error } = await supabase.from("add").select("*").limit(4);
    if (error) throw error;
    setfeatureItems(data);
  };
  return (
    <div className=" bg-white">
      {/* hero section */}
      <section
        className="min-h-96 w-[95%] mx-auto relative flex items-center justify-center px-4  bg-cover bg-center "
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1470&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-gray-100/10"></div>
        <div className="w-full flex flex-col justify-center items-center p-10 text-center">
          <h1 className="text-4xl text-white sm:text-5xl font-bold mb-4">
            Delicious Starts Here
          </h1>
          <p className="text-lg  text-white sm:text-xl mb-6">
            Explore tasty meals delivered fresh to your door.
          </p>
          <Link
            to="/products"
            className="bg-orange-500 text-white px-6 py-3 rounded-2xl text-lg font-medium hover:bg-orange-600 transition"
          >
            Browse Menu
          </Link>
        </div>
      </section>
      {/* why chooseUs */}
      <section className="py-16 px-4 bg-white">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Why Choose Us
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {choose.map((item, index) => (
            <div className="text-center transform transition duration-300 hover:scale-125" key={index}>
              <div className="text-4xl text-orange-500 mb-2">{item.icon}</div>
              <h3 className="font-semibold text-lg ">{item.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
      {/* feuturedImage */}
      <section className="py-16 px-4 bg-gray-50">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Featured Meals
        </h2>
        <Link
          className="block text-right text-lg text-orange-600 hover:underline font-semibold pr-4 mb-4 "
        to="/products">view all</Link>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {featureItems.map((item) => (
            <Link to={`/product/${item.id}`} className="bg-white rounded-lg shadow-sm p-4 transform transition duration-300 hover:scale-105 hover:shadow-md">
              <img
                src={item.image_url}
                alt=""
                className="w-full h-48 object-cover"
              />
              <div className="flex justify-between p-4">
                <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                <p  className="text-orange-500 font-medium text-lg mt-1">${item.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      {/* how it works */}
      <section>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          How It Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto text-center mb-2">
          <div>
            <div className="text-5xl mb-3">📱</div>
            <h4 className="text-xl font-semibold">1. Choose Your Meal</h4>
            <p className="text-sm text-gray-600 mt-2">
              Browse our menu and pick what you love.
            </p>
          </div>
          <div>
            <div className="text-5xl mb-3">🛵</div>
            <h4 className="text-xl font-semibold">2. Place Your Order</h4>
            <p className="text-sm text-gray-600 mt-2">
              Easy checkout with secure payment.
            </p>
          </div>
          <div>
            <div className="text-5xl mb-3">😋</div>
            <h4 className="text-xl font-semibold">3. Enjoy Your Meal</h4>
            <p className="text-sm text-gray-600 mt-2">
              Fresh, hot food delivered fast to you.
            </p>
          </div>
        </div>
      </section>
       {/* Testimonials */}
       <section className="py-16 px-4 bg-gray-100">
       <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">What Our Customers Say</h2>
        <div className="max-w-4xl mx-auto text-center text-gray-700 italic">
          <p className="text-lg">“This is hands down the best food delivery I've ever tried! Fresh, hot, and always on time.”</p>
        </div>
       </section>
    </div>
  );
};

export default Home;
