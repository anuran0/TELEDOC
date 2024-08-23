const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(bodyParser.json());

app.post('/api/symptoms', (req, res) => {
  const { symptoms } = req.body;

  // Handle the symptoms data (e.g., pass to AI model, store in database)
  console.log('Received symptoms:', symptoms);

  // For example, simulate a response
  res.json({
    message: 'Symptoms received successfully!',
    data: symptoms,
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});