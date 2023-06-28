const mongoose = require('mongoose');
const DB = 'mongodb+srv://tpaulbe21:Tusshar137@cluster0.pridcwk.mongodb.net/onlinejudge?retryWrites=true&w=majority';

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log(`Connection done`)
}).catch((e) => console.log("Error:", e));