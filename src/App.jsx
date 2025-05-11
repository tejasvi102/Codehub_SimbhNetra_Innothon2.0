import React, { useState } from "react";
import axios from "axios";

function App() {
  const [registerData, setRegisterData] = useState({
    name: "",
    age: "",
    description: "",
    image: null,
  });

  

  const [detectImage, setDetectImage] = useState(null);

  const handleRegister = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  await fetch("http://localhost:8000/register", {
    method: "POST",
    body: formData,
  });
};


  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleRegisterImageChange = (e) => {
    setRegisterData({ ...registerData, image: e.target.files[0] });
  };

  const handleDetectImageChange = (e) => {
    setDetectImage(e.target.files[0]);
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!registerData.image) return alert("Please upload an image");

    const formData = new FormData();
    formData.append("name", registerData.name);
    formData.append("age", registerData.age);
    formData.append("description", registerData.description);
    formData.append("image", registerData.image);

    try {
      await axios.post("http://localhost:8000/register", formData);
      alert("Person registered successfully");
    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }
  };

  const handleDetectSubmit = async (e) => {
    e.preventDefault();
    if (!detectImage) return alert("Please upload an image");

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result;

      try {
        const response = await axios.post(
          "http://localhost:8000/recognize",
          new URLSearchParams({ image: base64Image })
        );
        alert(JSON.stringify(response.data));
      } catch (err) {
        console.error(err);
        alert("No match found or error occurred.");
      }
    };
    reader.readAsDataURL(detectImage);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 font-sans">
      {/* Header */}
      <header className="max-w-6xl mx-auto bg-white p-6 rounded-2xl shadow text-center">
        <h1 className="text-4xl font-extrabold text-indigo-700 mb-2">👁️‍🗨️ Simbh Netra</h1>
        <p className="text-gray-600 text-lg">
          A smart AI-powered system to help identify and reunite lost individuals.
        </p>
      </header>

      {/* Hero Info Section */}
      <section className="max-w-6xl mx-auto mt-10 bg-gradient-to-r from-indigo-100 to-purple-100 p-6 rounded-2xl shadow">
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">🔍 What is Simbh Netra?</h2>
        <p className="text-gray-700 leading-relaxed">
          Simbh Netra is an AI-based lost and found system that uses face detection to help identify missing or lost persons.
          It allows authorities to register individuals, and the public to upload images to find matches using AI technology.
        </p>
      </section>

      {/* Main Functional Areas */}
      <main className="max-w-6xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Register Lost Person */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-xl font-semibold text-indigo-700 mb-4">👤 Register Person</h3>
          <form className="space-y-4" onSubmit={handleRegister} encType="multipart/form-data">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={registerData.name}
              onChange={handleRegisterChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={registerData.age}
              onChange={handleRegisterChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <textarea
              name="description"
              placeholder="Description / Additional Info"
              value={registerData.description}
              onChange={handleRegisterChange}
              rows="3"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            ></textarea>
            <input
              type="file"
              accept="image/*"
              onChange={handleRegisterImageChange}
              className="w-full"
            />
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Register Person
            </button>
          </form>
        </div>

        {/* Detect Lost Person */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-xl font-semibold text-green-700 mb-4">🖼️ Upload Image to Detect</h3>
          <form onSubmit={handleDetectSubmit} className="space-y-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleDetectImageChange}
              className="w-full"
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
              Detect Match
            </button>
          </form>
          <p className="mt-4 text-sm text-gray-500">
            The system will compare the uploaded image with the registered records and show potential matches.
          </p>
        </div>
      </main>

      {/* About / Use Cases */}
      <section className="max-w-6xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow">
        <h2 className="text-2xl font-bold text-indigo-700 mb-4">📌 Use Cases</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Helping police and NGOs identify missing people.</li>
          <li>Assisting shelters in identifying people with memory issues.</li>
          <li>Used at crowded events or fairs to reunite lost children or elders.</li>
          <li>Community-level tool for social welfare workers.</li>
        </ul>
      </section>

      {/* Footer */}
      <footer className="mt-12 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Simbh Netra — Created with ❤️ by Team AI Vision
      </footer>
    </div>
  );
}

export default App;
