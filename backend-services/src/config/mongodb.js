import mongoose from 'mongoose';


const configureConnection = () => {
  mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    console.log('successfully connected to mongodb')
  });
  return db;
};

export default configureConnection;
