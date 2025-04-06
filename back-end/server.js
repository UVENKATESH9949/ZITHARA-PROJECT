const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const jewelleryRoutes = require('./routes/jewelleryRoutes');
app.use('/api/jewellery', jewelleryRoutes);

app.use('/api', authRoutes); // Register the route

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.get("/", (req, res) => {
  res.send("ZITHARA backend is live!");
});

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
