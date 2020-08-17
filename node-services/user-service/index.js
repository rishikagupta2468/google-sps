const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 8082;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', require('./routes/authenticate'));

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
})