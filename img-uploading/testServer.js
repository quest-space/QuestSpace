const express = require('express');
const multer = require('multer');

// port to listen at
const PORT = 3335;

// set up express app
const app = express();

app.use(express.static(`./`));

app.use(express.json());

const upload = multer({ dest: 'img-uploads/' });

app.post(`/api-img`, upload.single('logo'), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  res.status(200).send({
    body: 'ho gaya',
    imgURL: req.file.path
  });
});

// error handling (from routes) middleware
app.use((err, req, res, next) => {
  console.log(err); // to see properties of message in our console
  res.status(422).send({error: err.message});
});

app.listen(PORT, () => {
  console.log(`Listening for requests at port ${PORT}`);
});
