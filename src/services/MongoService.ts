import mongoose from "mongoose";

export function mongoConnect() {
  let uri = process.env['MONGO_TEST_URI'] || ''
  if(uri.length> 0){
    mongoose.connect(uri).then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((err) => {
      console.error('Error connecting to MongoDB:', err);
    });
  } else {
    console.log('empty mongo URI')
  }
  return mongoose
}

// mongoose.connection.close()