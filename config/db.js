const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(
      "mongodb+srv://rafayabdul508:lhmOLP12AbGiw1fy@cluster0.wwulswb.mongodb.net/",
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        // useCreateIndex: true,
        writeConcern: {
          w: "majority",
        },
      }
    );
    console.log(`mongoDB connected: ${connect.connection.host}`);
  } catch (error) {
    console.log("error in mongodb connection" + error);
    process.exit(1);
  }
};

module.exports = connectDB;
