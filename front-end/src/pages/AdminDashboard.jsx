import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

const apiUrl = (process.env.REACT_APP_API_BASE_URL || 'https://zithara-jewellery.onrender.com').replace(/\/$/, '');

const AdminDashboard = () => {
  const [jewelleryItems, setJewelleryItems] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    imageUrl: ''
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/jewellery`);
      const data = await response.json();
      setJewelleryItems(data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name.trim(),
      price: formData.price.trim(),
      description: formData.description.trim(),
      category: formData.category.trim(),
      imageUrl: formData.imageUrl.trim()
    };

    console.log('Sending data to server:', payload);

    const url = editId
      ? `${apiUrl}/api/jewellery/${editId}`
      : `${apiUrl}/api/jewellery`;
    const method = editId ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setFormData({ name: '', price: '', description: '', category: '', imageUrl: '' });
        setEditId(null);
        fetchItems();
      } else {
        console.error('Update failed. Please check input or server.');
      }
    } catch (error) {
      console.error('Save error:', error);
    }
  };

  const handleEdit = (item) => {
    const { _id, ...editableFields } = item;
    setFormData(editableFields);
    setEditId(_id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/api/jewellery/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchItems(); // Refresh list after deletion
      } else {
        console.error('Delete failed.');
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  return (
    <div className="admin-container">
      <h2>Admin Dashboard - Manage Jewellery</h2>

      <form className="admin-form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Jewellery Name" value={formData.name} onChange={handleChange} required />
        <input type="text" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
        <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
        <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} />
        <input type="text" name="imageUrl" placeholder="Image URL" value={formData.imageUrl} onChange={handleChange} />
        <button type="submit">{editId ? 'Update Item' : 'Add Item'}</button>
      </form>

      <div className="item-list">
        {jewelleryItems.map((item) => (
          <div key={item._id} className="item-card">
            <img src={item.imageUrl} alt={item.name} />
            <h4>{item.name}</h4>
            <p>₹{item.price}</p>
            <p>{item.description}</p>
            <p><strong>Category:</strong> {item.category}</p>
            <div className="card-buttons">
              <button onClick={() => handleEdit(item)}>Edit</button>
              <button onClick={() => handleDelete(item._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
