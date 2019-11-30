import mongoose from 'mongoose';


const configureMongoose = ()=> {
  mongoose.connect('mongodb://localhost:27017', {useNewUrlParser: true, useUnifiedTopology: true});
  let db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log('successfully connected to mongodb')
  });
  return db;
}

export default configureMongoose;