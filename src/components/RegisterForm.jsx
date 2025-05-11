import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);
    formData.append('name', name);
    formData.append('age', age);

    try {
      const response = await axios.post('http://127.0.0.1:5000/upload', formData);
      alert(response.data.message);
    } catch (error) {
      alert('Upload failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={e => setImage(e.target.files[0])} required />
      <input type="text" placeholder="Name" onChange={e => setName(e.target.value)} required />
      <input type="number" placeholder="Age" onChange={e => setAge(e.target.value)} required />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
