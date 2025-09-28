import React, { useState } from "react";
import EnquiryList from "./enquiryList/enquiryList.jsx";
import axios from "axios";

const UserEnquiryUI = () => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const saveEnquiry = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    
    const formData = {
      kname: e.target[0].value,
      kemail: e.target[1].value,
      kphone: e.target[2].value,
      kmessage: e.target[3].value
    };

    try {
      const response = await axios.post("/api/enquiries", formData);
      console.log("Enquiry saved successfully:", response.data);
      setMessage("Enquiry submitted successfully!");
      e.target.reset(); // Reset the form
      setRefreshTrigger(prev => prev + 1); // Trigger refresh of enquiry list
    } catch (error) {
      console.error("Error saving enquiry:", error);
      setMessage("Error submitting enquiry. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">User Enquiry</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Enquiry Form */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Enquiry Form</h2>
          <form className="space-y-4" onSubmit={saveEnquiry}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Your Name
              </label>
              <input
                type="text"
                placeholder="Enter Your Name"
                required
                className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Your Email
              </label>
              <input
                type="email"
                placeholder="Enter Your Email"
                required
                className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Your Phone
              </label>
              <input
                type="tel"
                placeholder="Enter Your Phone"
                required
                className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Your Message
              </label>
              <textarea
                placeholder="Message..."
                rows="3"
                required
                className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
              ></textarea>
            </div>

            {message && (
              <div className={`p-3 rounded-lg text-center ${
                message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
              }`}>
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Saving...' : 'Save'}
            </button>
          </form>
        </div>

        {/* Enquiry List */}
        <EnquiryList key={refreshTrigger} />
      </div>
    </div>
  );
};

export default UserEnquiryUI;
