const mongoose = require('mongoose');
const app = require('./app');

const url = 'mongodb://localhost:27017/pcodel-restaurant';
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .catch((err) => console.log(err));

const port = process.env.PORT || 3000;
app.listen(port, 'localhost', () => console.log(`App running on port ${port}`));
