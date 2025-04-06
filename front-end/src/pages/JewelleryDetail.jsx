// src/pages/JewelleryDetail.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import './JewelleryDetail.css'; // create this if needed for styling

const JewelleryDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const [item, setItem] = useState(location.state?.item || null);
  const [loading, setLoading] = useState(!item);

  useEffect(() => {
    // If item not passed from navigation, fetch from backend using id
    if (!item) {
      axios.get(`http://localhost:5000/api/jewellery/${id}`)
        .then((res) => {
          setItem(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching item:', err);
          setLoading(false);
        });
    }
  }, [id, item]);

  if (loading) {
    return <div className="detail-container"><p>Loading...</p></div>;
  }

  if (!item) {
    return <div className="detail-container"><p>Item not found.</p></div>;
  }

  return (
    <div className="detail-container">
      <h2>{item.name}</h2>
      <img src={item.imageUrl} alt={item.name} className="detail-img" />
      <p><strong>Price:</strong> ₹{item.price}</p>
      <p><strong>Category:</strong> {item.category}</p>
      <p><strong>Description:</strong> {item.description}</p>
    </div>
  );
};

export default JewelleryDetail;
