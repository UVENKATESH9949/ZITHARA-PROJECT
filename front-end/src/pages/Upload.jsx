import React, { useState } from 'react';
import axios from 'axios';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState([]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/upload`, formData);
      setResults(res.data.results);
    } catch (err) {
      alert('Upload failed');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Upload Jewellery Image</h1>
      <form onSubmit={handleUpload} className="mb-6">
        <input type="file" onChange={(e) => setFile(e.target.files[0])} required className="mb-4" />
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">Search</button>
      </form>
      <div className="grid grid-cols-2 gap-4">
        {results.map((item) => (
          <div key={item.id} className="p-4 border rounded shadow">
            <img src={`http://localhost:5000${item.image}`} alt={item.name} className="w-full h-40 object-cover mb-2" />
            <h2 className="text-lg font-bold">{item.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Upload;
