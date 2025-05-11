import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [image, setImage] = useState(null);

  const handleImageCapture = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!image || !name || !age) {
      alert("Please fill all fields and capture an image");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/register", new URLSearchParams({
        image: image,
        name: name,
        age: age
      }));

      alert("User registered successfully!");
    } catch (error) {
      console.error("Error during registration", error);
    }
  };

  return (
    <div>
      <h1>Register User</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Age" 
          value={age} 
          onChange={(e) => setAge(e.target.value)} 
        />
        <input 
          type="file" 
          accept="image/*" 
          capture="camera" 
          onChange={handleImageCapture} 
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
