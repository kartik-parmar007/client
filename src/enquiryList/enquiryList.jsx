import React, { useState, useEffect } from 'react';
import axios from 'axios';

const enquiryList = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/enquiries');
      setEnquiries(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch enquiries');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  // Expose fetchEnquiries method to parent component

  const deleteEnquiry = async (id) => {
    if (window.confirm('Are you sure you want to delete this enquiry?')) {
      try {
        await axios.delete(`/api/enquiries/${id}`);
        fetchEnquiries(); // Refresh the list
      } catch (err) {
        alert('Failed to delete enquiry');
      }
    }
  };

  const startEdit = (enquiry) => {
    setEditingId(enquiry._id);
    setEditFormData({
      name: enquiry.name,
      email: enquiry.email,
      phone: enquiry.phone,
      message: enquiry.message
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditFormData({ name: '', email: '', phone: '', message: '' });
  };

  const saveEdit = async () => {
    try {
      const updateData = {
        kname: editFormData.name,
        kemail: editFormData.email,
        kphone: editFormData.phone,
        kmessage: editFormData.message
      };
      
      await axios.put(`/api/enquiries/${editingId}`, updateData);
      setEditingId(null);
      setEditFormData({ name: '', email: '', phone: '', message: '' });
      fetchEnquiries(); // Refresh the list
      alert('Enquiry updated successfully!');
    } catch (err) {
      alert('Failed to update enquiry');
    }
  };

  const handleInputChange = (field, value) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (loading) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Enquiry List</h2>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Enquiry List</h2>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }
  return (
    <div>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Enquiry List</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
              <tr>
                <th className="px-4 py-2">SR NO</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Phone</th>
                <th className="px-4 py-2">Message</th>
                <th className="px-4 py-2">Delete</th>
                <th className="px-4 py-2">Edit</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.length > 0 ? (
                enquiries.map((enquiry, index) => (
                  <tr key={enquiry._id} className="border-b">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">
                      {editingId === enquiry._id ? (
                        <input
                          type="text"
                          value={editFormData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="w-full px-2 py-1 border rounded text-sm"
                        />
                      ) : (
                        enquiry.name
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {editingId === enquiry._id ? (
                        <input
                          type="email"
                          value={editFormData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full px-2 py-1 border rounded text-sm"
                        />
                      ) : (
                        enquiry.email
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {editingId === enquiry._id ? (
                        <input
                          type="tel"
                          value={editFormData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="w-full px-2 py-1 border rounded text-sm"
                        />
                      ) : (
                        enquiry.phone
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {editingId === enquiry._id ? (
                        <textarea
                          value={editFormData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          className="w-full px-2 py-1 border rounded text-sm"
                          rows="2"
                        />
                      ) : (
                        enquiry.message
                      )}
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => deleteEnquiry(enquiry._id)}
                        className="text-red-600 cursor-pointer hover:underline"
                        disabled={editingId === enquiry._id}
                      >
                        Delete
                      </button>
                    </td>
                    <td className="px-4 py-2">
                      {editingId === enquiry._id ? (
                        <div className="flex space-x-2">
                          <button
                            onClick={saveEdit}
                            className="text-green-600 cursor-pointer hover:underline text-sm"
                          >
                            Save
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="text-gray-600 cursor-pointer hover:underline text-sm"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => startEdit(enquiry)}
                          className="text-cyan-600 cursor-pointer hover:underline"
                        >
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-4 py-2 text-center text-gray-500">
                    No enquiries found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default enquiryList;
