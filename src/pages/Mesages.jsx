import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const Mesages = () => {
  const [message, setMessage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [reply, setReply] = useState("");
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  useEffect(() => {
    fetchMeassge();
  }, []);
  const fetchMeassge = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("contact")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setMessage(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReply = async (e) => {
    e.preventDefault();
    if (!reply.trim()) return;
    try {
      const { error } = await supabase
        .from("contact")
        .update({ reply })
        .eq("id", selectedMessageId);
      if (error) throw error;
      setReply("");
      setSelectedMessageId(null);
      fetchMeassge();
    } catch (error) {
      console.error("Error replying to message:", error);
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
    <div className="min-h-screen bg-white py-12 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        📬 Contact Messages
      </h1>
      {message.length === 0 ? (
        <p className="text-center text-gray-600">No messages found.</p>
      ) : (
        <div className="space-y-2">
          {message.map((mes) => (
            <div key={mes.id} className="bg-gray-50 p-4 rounded-xl shadow-md">
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
              <button
                className="mt-2 bg-orange-500 text-white px-4 py-2 rounded-2xl"
                onClick={() => {
                  setSelectedMessageId(mes.id);
                  setReply(mes.reply || "");
                }}
              >
                Reply
              </button>
            </div>
          ))}
          {selectedMessageId && (
            <div className="t-4">
              <h3 className="text-2xl font-semibold text-gray-800">
                Reply to Message
              </h3>
              <form onSubmit={handleReply}>
                <textarea
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                  rows="5"
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Type your reply here"
                ></textarea>
                <button
                  className="w-full mt-4 bg-orange-500 text-white px-6 py-3 rounded-2xl font-medium hover:bg-orange-600 transition"
                  type="submit"
                >
                  Send Reply
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Mesages;
