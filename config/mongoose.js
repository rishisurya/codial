// getting-started.js
const mongoose = require('mongoose');
db = mongoose.connection;
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/User', {useNewUrlParser: true, useUnifiedTopology: true});
    console.log('connected to Databse:: MonogoDB')
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
};

module.exports = db;
