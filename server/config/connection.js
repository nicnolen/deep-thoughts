//TODO: HANDLE MONGOOSE DATABASE CONNECTION 
//! Import Mongoose
const mongoose = require('mongoose');

//! Connect to MongoDB_URI environmental variable if its there, otherwise connect to localhost
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/deep-thoughts', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

//! Export Mongoose connection
module.exports = mongoose.connection;
