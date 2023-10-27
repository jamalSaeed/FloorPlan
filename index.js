
const mongoose = require('mongoose')

const dotenv = require('dotenv')

dotenv.config({path:'./config.env'})
const app = require('./app')



const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }
// added comments

//   /
// const connectDB = async () => {
// try {
//     const DB = process.env.DATABASE
//     const con = await mongoose.connect(DB, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     }).then(() => console.log("Database connected successfully!!"));
// } catch (error) {
//     console.error("Error connecting to the database:", error);
// }
// }



const port = process.env.PORT || 3000
connectDB().then(() => {
app.listen(port,() =>{
console.log(`server is running on ${port}` )
})
})