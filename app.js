const cors = require('cors');
const express = require('express')
const floorRoutes = require('./routes/floorRoutes')
const app = express()

app.use(express.json());
app.use(cors());
app.use('/public', express.static('public'));
app.use('/api/v1/floorplan', floorRoutes)
app.get('/', (req, res) => {
    res.send('Hello, welcome to FloorPlan api!');
  });

// 


module.exports = app
