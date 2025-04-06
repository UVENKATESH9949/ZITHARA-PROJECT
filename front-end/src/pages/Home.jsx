import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_BASE_URL;
axios.get(`${apiUrl}/api/jewellery`)

function Home() {
  const [image, setImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  const fetchItems = async (query = '') => {
    try {
      const response = await axios.get(`${apiUrl}/api/jewellery?search=${query}&limit=50`);
      setItems(response.data);
    } catch (error) {
      console.error('Failed to fetch jewellery items:', error);
    }
  };

  useEffect(() => {
    fetchItems(); 
  }, []);

  const handleSearch = () => {
    fetchItems(searchQuery);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleItemClick = (item) => {
    navigate(`/jewellery-detail/${item._id}`, { state: { item } });
  };

  return (
    <div className="home-container">
      <h1>Welcome to Zitara Jewellery Finder</h1>
      <p>Upload a jewellery image to find similar items</p>

      <div className="upload-box">
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {image && <img src={image} alt="Uploaded preview" className="preview-img" />}
        <button onClick={() => alert("Visual search not implemented yet.")}>Search Jewellery</button>
      </div>

      <div className="nav-buttons">
        <button onClick={() => navigate('/login', { state: { isAdminLogin: true } })}>
          Admin
        </button>
        <button onClick={() => navigate('/upload')}>Upload</button>
      </div>

      <div className="search-section">
        <input
          type="text"
          placeholder="Search Jewellery..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">Search</button>
      </div>

      <div className="demo-items">
        {items.length > 0 ? (
          items.map((item) => (
            <div
              key={item._id}
              className="demo-card"
              onClick={() => handleItemClick(item)}
              style={{ cursor: 'pointer' }}
            >
              <img src={item.imageUrl} alt={item.name} className="demo-img" />
              <h3>{item.name}</h3>
              <p>₹{item.price}</p>
            </div>
          ))
        ) : (
          <p>No items found.</p>
        )}
      </div>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Zitara Jewellery. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
