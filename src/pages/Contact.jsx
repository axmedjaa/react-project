import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import toast from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const[isOpen,setIsOpen]=useState(false)
  useEffect(()=>{
    currentUser()
  },[])
  useEffect(() => {
    if (userId) {
      fetchMeassge();
    }
  },[userId]);
  const currentUser=async()=>{
    const{data:{user},error}=await supabase.auth.getUser()
    if (error) {
      console.error("Error getting user:", error);
      toast.error('')
      toast.error("Failed to get user.");
    } else {
      setUserId(user?.id);
    }
  }
  const fetchMeassge = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("contact")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      setMessages(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleChnage = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    )
      return;
      if (!userId) {
        toast.error("User not found. Please sign in again.");
        return;
      }    
    const { error } = await supabase.from("contact").insert({
      name: formData.name,
      email: formData.email,
      message: formData.message,
      user_id:userId
    });
    if (error) {
      console.error("Submission error:", error);
      toast.error("Something went wrong. Please try again.");
    } else {
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex justify-center items-center bg-white py-16 px-4">
      <div className="w-full max-w-xl bg-gray-50 p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          📞 Contact Us
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="block text-lg font-medium mb-2" htmlFor="name">
              name:
            </label>
            <input
              className="w-full bg-orange-500 text-white px-4 py-2 rounded-2xl font-medium outline-none"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              placeholder="enter your name"
              onChange={handleChnage}
            />
          </div>
          <div className="mb-2">
            <label className="block text-lg font-medium mb-2" htmlFor="email">
              Email Address:
            </label>
            <input
              className="w-full bg-orange-500 text-white px-4 py-2 rounded-2xl font-medium outline-none"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              placeholder="enter your email"
              onChange={handleChnage}
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2" htmlFor="Message">
              Your Message
            </label>
            <textarea
              placeholder="Enter your message"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none "
              rows="5"
              value={formData.message}
              id="Message"
              name="message"
              onChange={handleChnage}
            ></textarea>
          </div>
          <button
            className="w-full bg-orange-500 text-white px-6 py-3 rounded-2xl font-medium hover:bg-orange-600 transition"
            type="submit"
          >
            Send Message
          </button>
        </form>
        <h2 className="text-2xl font-bold mt-8 mb-2">Your Messages</h2>
        <button
        className="mt-4 mb-2 px-4 py-2 bg-orange-500 text-white rounded-2xl hover:bg-orange-600 transition"
        onClick={()=>setIsOpen(!isOpen)}>{isOpen?'close messaga':'open massage'}</button>
       {
        isOpen&&(
          <div>
          {messages.length === 0 ? (
            <p className="text-center text-gray-600">
              You haven't sent any messages yet.
            </p>
          ) : (
            <div>
              {messages.map((mes) => (
                <div key={mes.id}>
                  <h3 className="font-semibold text-lg text-orange-600">
                    {mes.name}
                  </h3>
                  <p className="text-sm text-gray-700">{mes.email}</p>
                  <p className="text-gray-800 mb-2">{mes.message}</p>
                  <p className="text-sm text-gray-500 text-right mt-1">
                    {new Date(mes.created_at).toLocaleString()}
                  </p>
                  {mes.reply && (
                    <div className="mt-4">
                      <h4 className="font-semibold text-gray-600">reply:</h4>
                      <p className="text-gray-700">{mes.reply}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          </div>
        )
       }
      </div>
    </div>
  );
};

export default Contact;
