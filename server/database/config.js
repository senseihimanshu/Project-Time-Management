const mongoose = require("mongoose");
// const url="mongodb://localhost:27017/Project-Management"
// const url="mongodb+srv://deepak:deepak@cluster0-kehud.mongodb.net/Project-Management?retryWrites=true&w=majority"
const url =
  "mongodb+srv://deepak:deepak@cluster0-kehud.mongodb.net/Project-Management?retryWrites=true&w=majority";
mongoose.Promise = global.Promise;
mongoose
  .connect(url, {
    useNewUrlParser: true,
    keepAlive: 1,
    useUnifiedTopology: true
  })
  .then(res => {
  })
  .catch(error => {
    console.error(error.message);
  });
module.exports = mongoose;
