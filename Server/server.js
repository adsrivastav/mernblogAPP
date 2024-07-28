const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

// Use the environment variable for MongoDB connection string
const mongoURI = process.env.MONGO_URI;

// Connect to MongoDB Atlas
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected successfully');
})
.catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

// Define Post schema
const PostSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Post = mongoose.model('Post', PostSchema);

// Get all posts
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ error: 'Error fetching posts' });
  }
});

// Add a new post
app.post('/api/posts', async (req, res) => {
  const { title, content } = req.body;
  try {
    const newPost = await Post.create({ title, content });
    res.status(201).json(newPost);
  } catch (err) {
    console.error('Error adding post:', err);
    res.status(500).json({ error: 'Error adding post' });
  }
});

// Delete a post
app.delete('/api/posts/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await Post.findByIdAndDelete(id);
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error('Error deleting post:', err);
    res.status(500).json({ error: 'Error deleting post' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
