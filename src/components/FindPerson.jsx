import React, { useState } from 'react';
import axios from 'axios';

const FindPersonForm = () => {
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post('http://127.0.0.1:5000/find', formData);
      if (response.data.name) {
        alert(`Found: ${response.data.name}, Age: ${response.data.age}`);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert('Search failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={e => setImage(e.target.files[0])} required />
      <button type="submit">Find Person</button>
    </form>
  );
};

export default FindPersonForm;
