import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react'
import { useLocation,useNavigate } from 'react-router-dom';

const Home = ({url}) => {

  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state;

  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [formData,setFormData] = useState({});
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);

      // Update UI preview immediately
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, image: imageUrl }));
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const formDataToSend = new FormData();
  formDataToSend.append("name", formData.name);
  formDataToSend.append("email", formData.email);
  if (imageFile) {
    formDataToSend.append("image", imageFile);
  }
  
  const handleSubmit = async () => {
    try {
      const response = await axios.put(`${url}/api/user/update-data`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("User updated:", response.data.data);
      setIsEditing(false);
      setImageFile(null);
      setFormData(response.data.data);
      setUpdateTrigger(prev => !prev);      
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login")
  }

  useEffect(() => {
    
    if (!email) return;
  
    const fetchData = async () => {
      try {
        const response = await axios.post(`${url}/api/user/get-data`, { email });
        setFormData(response.data.data);
      } catch (error) {
        console.error("Error in displaying data:", error);
      }
    };
  
    fetchData();
    
  }, [email, updateTrigger]);


  return (
    <div className="flex flex-col items-center mt-10">
      <div className="bg-white p-6 rounded-xl shadow-lg text-center w-80 border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">Welcome To User Homepage</h1>
        <h3 className="text-lg text-gray-600 mt-2">User Details</h3>

        
        <div className="relative w-24 h-24 mx-auto mt-4">
          <img
            src={imageFile ? formData.image : `${url}/images/${formData.image}`}
            alt="User Profile"
            className="w-24 h-24 rounded-full border-4 border-blue-500 cursor-pointer"
            onClick={isEditing? handleImageClick : undefined}
          />
          
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        {isEditing ? (
          <>
            {/* Editable Name and Email */}
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-3 px-4 py-2 border rounded-md w-full"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-3 px-4 py-2 border rounded-md w-full"
              readOnly
            />

            {/* Save Button */}
            <button
              onClick={handleSubmit}
              className="mt-3 px-6 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600"
            >
              Save
            </button>
          </>
        ) : (
          <>
            <h4 className="text-lg font-semibold text-gray-700 mt-3">Name: {formData.name}</h4>
            <h4 className="text-lg text-gray-600">Email: {formData.email}</h4>
            {/* Edit Button */}
            <button
              onClick={() => setIsEditing(true)}
              className="mt-3 px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
            >
              Edit
            </button>
          </>
        )}
      </div>

      {/* Logout Button */}
      <button
        type="submit"
        onClick={logout}
        className="mt-6 px-6 py-3 bg-red-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-red-600 transition-transform transform hover:scale-105"
      >
        Logout
      </button>
    </div>
  )
}

export default Home