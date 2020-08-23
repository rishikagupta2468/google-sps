const express = require('express');
const shareRoutes = require('./routes/index');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/share', shareRoutes);

app.listen(PORT, () => {
  console.log(`server running at port ${ PORT }`);
});