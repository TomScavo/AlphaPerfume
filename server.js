const express = require('express');

const connectDB = require('./config/db');

const app = express();

//connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/cart', require('./routes/api/cart'));
app.use('/api/address', require('./routes/api/address'));
app.use('/api/perfume', require('./routes/api/perfume'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));