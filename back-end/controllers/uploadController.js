const Jewellery = require('../models/Jewellery');

// Get all jewellery items
exports.getAllJewellery = async (req, res) => {
  try {
    const items = await Jewellery.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch items' });
  }
};

// Add a new jewellery item
exports.addJewellery = async (req, res) => {
  try {
    const { name, price, description, category, imageUrl } = req.body;
    const newItem = new Jewellery({ name, price, description, category, imageUrl });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add item' });
  }
};

// Update an item
exports.updateJewellery = async (req, res) => {
  try {
    const updatedItem = await Jewellery.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update item' });
  }
};

// Delete an item
exports.deleteJewellery = async (req, res) => {
  try {
    await Jewellery.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete item' });
  }
};
