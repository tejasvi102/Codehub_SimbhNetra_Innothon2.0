import React, { useState } from 'react';
import axios from 'axios'; // make sure axios is installed

const HomePage = () => {
  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!image) {
      alert("Please select an image first.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result;

      try {
        const response = await axios.post('http://localhost:8000/recognize', new URLSearchParams({
          image: base64Image
        }));

        alert(JSON.stringify(response.data));
      } catch (error) {
        alert("No match found or server error.");
      }
    };

    reader.readAsDataURL(image);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Existing content above */}

      <section className="py-10 text-center">
        <h2 className="text-2xl font-bold mb-4">Try Face Recognition</h2>
        <input type="file" accept="image/*" onChange={handleFileChange} className="mb-4" />
        <br />
        <button
          onClick={handleSubmit}
          className="bg-purple-600 text-white px-6 py-2 rounded-lg"
        >
          Submit Image
        </button>
      </section>

      {/* Existing footer below */}
    </div>
  );
};

export default HomePage;
