const db = require("./connection");
const { User, Course, Blueprint, Category, Order, Post } = require("../models");

db.once("open", async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: "metal working" },
    { name: "wood working" },
    { name: "digital" },
    { name: "print working" },
    { name: "textile" },
    { name: "ceramics" },
  ]);

  console.log("categories seeded");
  console.log(categories[0]._id, categories[0].name)
  await User.deleteMany();

  await User.create(
    {
      firstName: "Jonathan",
      lastName: "Eimer",
      email: "jleimer@testmail.com",
      username: "jleimer",
      password: "ghost",
    },
    {
      firstName: "Keegan",
      lastName: "Wedwick",
      email: "kwedwick@testmail.com",
      password: "ghost",
      username: "kwedwick",
    }
  );

  console.log("User(s) seeded");

  await Course.deleteMany();
  const courses = await Course.insertMany([
    {
      name: "Resin Pouring",
      description:
        "Learn how to do the trending resin pouring technique from your home! We will ship you the supplies and you will attend the scheduled Zoom class with our specialized instructor.  Learn to make your very own resin and wood cutting board or decorative piece.",
      price: 85.0,
      difficulty: "Beginner",
      items: "Resin, wood(walnut), pouring frame",
      category: categories[2]._id,
      username: "jleimer"
    },
    {
      name: "Stained Glass",
      description:
        "Want to learn stained Glass!? Here is the place to do it. We will send you a box with all the tools and supplies you need to make our beginner stained glass piece that you can hang in your window. Attend the scheduled Zoom meeting with our spedcialized instructor",
      price: 80.0,
      difficulty: "Beginner",
      items:
        "Soldering Iron, flux, glass foil, precut stained glass, glass cutter",
      category: categories[0]._id,
      username: "kwedwick"
    },
  ]);
  console.log("courses seeded");
  console.log(courses[1].category)

  await Blueprint.deleteMany();

  const blueprint = await Blueprint.insertMany([
    {
      name: "Workbench",
      description:
        "This is an easy work that can fit in almost any garage or shop. Storage underneath and a places for a small tools on top. You can easliy add wheels to this for the perfect mobile bench.",
      image: "",
      file: "",
      price: 6.0,
      difficulty: "Some exprience required",
      category: categories[3]._id,
      username: "jleimer"
    },
    {
      name: "Shaker cabinet door",
      description:
        "Plans for basic shaker cabinet doors.  Just adjust plans for custom measurements and you are set!",
      image: "",
      file: "",
      price: 5.0,
      difficulty: "Experience with table saw required",
      category: categories[4]._id,
      username: "kwedwick"
    },
  ]);
  console.log("blueprints seeded");

  await Post.deleteMany();
  const posts = await Post.insertMany([
    {
      postText: "This is a brand new post!",
      title: "First Post",
      username: "kwedwick",
      createdAt: "11/01/2020",
      category: categories[4]._id,
    },
    {
      postText: "This is a second post!",
      title: "Second Post",
      username: "kwedwick",
      createdAt: "10/30/2020",
      category: categories[2]._id,
    },
    {
      postText: "This is a third post!",
      title: "Third Post",
      username: "jleimer",
      createdAt: "10/31/2020",
      category: categories[2]._id,
    }
  ])
  console.log("post(s) seeded");

  process.exit();
});
