const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Post = require('./models/Post');


dotenv.config({ path: __dirname + '/.env' });


const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://mathiasnzioka0_db_user:12Mathias34@cluster0.jwozzm4.mongodb.net/mern_blog?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose
  .connect(mongoUri)
  .then(async () => {
    console.log('Connected to MongoDB');

    // Clear existing posts (optional)
    await Post.deleteMany({});

    // Create sample posts
    const samplePosts = [
      {
        title: 'Welcome to My MERN Blog',
        content: 'This is my first post using the MERN stack! I am learning backend and frontend integration.',
        featuredImage: 'default-post.jpg',
        slug: 'welcome-to-my-mern-blog',
        excerpt: 'A quick intro to my new MERN blog...',
        author: 'Mathias Kieti', 
        category: new mongoose.Types.ObjectId(), 
        tags: ['intro', 'mern', 'blog'],
        isPublished: true,
      },
      {
        title: 'Learning React with Tailwind CSS',
        content: 'React and Tailwind CSS make a powerful combo for building clean and modern UIs.',
        featuredImage: 'default-post.jpg',
        slug: 'learning-react-with-tailwind-css',
        excerpt: 'Exploring how React and Tailwind work together...',
        author: 'Ronald Mutua',
        category: new mongoose.Types.ObjectId(),
        tags: ['react', 'tailwind', 'frontend'],
        isPublished: true,
      },
      {
        title: 'Connecting Node.js and MongoDB',
        content: 'Using Mongoose, you can easily connect Node.js apps to MongoDB and manage your data efficiently.',
        featuredImage: 'default-post.jpg',
        slug: 'connecting-nodejs-and-mongodb',
        excerpt: 'Step-by-step guide to connecting Node.js and MongoDB...',
        author: new mongoose.Types.ObjectId(),
        category: new mongoose.Types.ObjectId(),
        tags: ['nodejs', 'mongodb', 'backend'],
        isPublished: true,
      },
    ];

    await Post.insertMany(samplePosts);
    console.log(' Sample posts added successfully!');
    await mongoose.connection.close();
    console.log(' Database connection closed');
  })
  .catch((err) => {
    console.error(' Error:', err);
  });
