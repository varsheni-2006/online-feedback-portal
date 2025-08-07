const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;
// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
// Handle form submission
app.post('/submit-feedback', (req, res) => {
  const feedback = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    rating: req.body.rating,
    comments: req.body.comments,
    recommend: req.body.recommend
  };
  // Save feedback to a local file
  const data = `\nName: ${feedback.name}\nEmail: ${feedback.email}\nPhone: ${feedback.phone}
  \nRating: ${feedback.rating}\nComments: ${feedback.comments}\nRecommend: ${feedback.recommend}\n---`;

  fs.appendFile('feedback.txt', data, (err) => {
    if (err) {
      return res.send('Error saving feedback.');
    }
    res.send('<h2>Thank you for your feedback!</h2><p><a href="/">Back to form</a></p>');
  });
});
// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
