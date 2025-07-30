const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');
const User = require('../../models/userModel');
const Review = require('../../models/reviewModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);
mongoose.connect(DB).then(() => console.log('DB connection successful'));

// Read JSON file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8'),
);

// Import data into DB
const importData = async () => {
  try {
    console.log('adding tours');
    // Assume tours loaded for this example comment it out
    await Tour.create(tours);
    console.log('not adding tours already there.');
    // console.log('adding users');
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews);
    console.log('adding reviews');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// Delete all data from DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    console.log('Data succesfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
if (process.argv[2] === '--import') importData();
else if (process.argv[2] === '--delete') deleteData();
console.log(process.argv);
