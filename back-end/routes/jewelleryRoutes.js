const express = require('express');
const router = express.Router();
const Jewellery = require('../models/Jewellery');

let jewelleryItems = [
  {
    id: 1,
    name: 'Diamond Ring',
    price: '15000',
    description: 'Elegant diamond ring for weddings',
    category: 'Ring',
    imageUrl: '',
  },
  {
    id: 2,
    name: 'Gold Necklace',
    price: '25000',
    description: '24K Gold traditional necklace',
    category: 'Necklace',
    imageUrl: '',
  },
];

// GET all items
// GET with search and limit
// Inside jewelleryRoutes.js or controller
router.get('/', async (req, res) => {
  const search = req.query.search || '';
  const regex = new RegExp(search, 'i'); // Case-insensitive

  try {
    const items = await Jewellery.find({
      $or: [{ name: regex }, { category: regex }],
    }).limit(50);
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch items' });
  }
});

// POST new item
router.post('/', async (req, res) => {
  const { name, price, description, category, imageUrl } = req.body;

  if (!name || !price || isNaN(price) || price <= 0 || !imageUrl) {
    return res.status(400).json({ error: 'Invalid input. Please check all fields.' });
  }

  try {
    const newJewellery = new Jewellery({ name, price, description, category, imageUrl });
    const savedItem = await newJewellery.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save item.' });
  }
});



// DELETE item
router.delete('/:id', async (req, res) => {
  try {
    const deletedItem = await Jewellery.findByIdAndDelete(req.params.id);
    res.json(deletedItem);
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' });
  }
});


// PUT update item
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price, description, category, imageUrl } = req.body;

  console.log("PUT request received with ID:", id);
  console.log("Data received:", req.body);

  if (!name || !price || isNaN(price) || price <= 0 || !imageUrl) {
    return res.status(400).json({ error: 'Invalid input for update.' });
  }

  try {
    const updatedItem = await Jewellery.findByIdAndUpdate(
      id,
      { name, price, description, category, imageUrl },
      { new: true }
    );

    if (!updatedItem) {
      console.log("No item found with ID:", id);
      return res.status(404).json({ error: 'Item not found.' });
    }

    console.log("Item updated:", updatedItem);
    res.json(updatedItem);
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: 'Failed to update item.' });
  }
});


module.exports = router;
