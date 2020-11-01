const db = require('./connection');
const { User, Class, Blueprint } = require('../models')

await Class.deleteMany();

const classes = await Class.insertMany([
    {
       name: 'Resin Pouring',
       description: 'Learn how to do the trending resin pouring technique from your home! We will ship you the supplies and you will attend the scheduled Zoom class with our specialized instructor.  Learn to make your very own resin and wood cutting board or decorative piece.',
       price: 85.00,
       difficulty: 'Beginner',
       items: 'Resin, wood(walnut), pouring frame'

    },
    {
        name: 'Stained Glass',
        description: 'Want to learn stained Glass!? Here is the place to do it. We will send you a box with all the tools and supplies you need to make our beginner stained glass piece that you can hang in your window. Attend the scheduled Zoom meeting with our spedcialized instructor',
        price: 80.00,
        difficulty: 'Beginner',
        items: 'Soldering Iron, flux, glass foil, precut stained glass, glass cutter'
    }
]);

await Blueprint.deleteMany();

const bluePrint = await Blueprint.insertMany([
    {
      name: 'Workbench',
      description: 'This is an easy work that can fit in almost any garage or shop. Storage underneath and a places for a small tools on top. You can easliy add wheels to this for the perfect mobile bench.',
      image: '',
      file: '',
      price: 6.00,
      difficulty: 'Some exprience required' 
    },
    {
      name: 'Shaker cabinet door',
      description: 'Plans for basic shaker cabinet doors.  Just adjust plans for custom measurements and you are set!',
      image: '',
      file: {},
      price: 5.00,
      difficulty: 'Experience with table saw required'
    }
]);

await User.deleteMany();

  await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    email: 'pamela@testmail.com',
    password: 'password12345',
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id]
      }
    ]
  });

  await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@testmail.com',
    password: 'password12345'
  });

