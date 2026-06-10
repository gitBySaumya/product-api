const express = require('express');
const app = express();

app.use(express.json());

// routes
const productRoutes = require('./routes/productRoutes');
const enquiryRoutes = require('./routes/enquiryRoutes');

// product routes
app.use('/api/products', productRoutes);

// enquiry routes
app.use('/api', enquiryRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});