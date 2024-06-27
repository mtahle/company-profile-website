const express = require('express');
const BlogPost = require('../models/BlogPost');
const { isAuthenticated } = require('./middleware/authMiddleware');
const router = express.Router();

// Route to display all blog posts
router.get('/blog', async (req, res) => {
  try {
    const blogPosts = await BlogPost.find({});
    res.render('blog', { blogPosts });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    res.status(500).send('Error fetching blog posts');
  }
});

// Route to display form for new blog post
router.get('/blog/new', isAuthenticated, (req, res) => {
  res.render('newBlogPost');
});

// Route to handle new blog post submission
router.post('/blog', isAuthenticated, async (req, res) => {
  try {
    const { title, content } = req.body;
    const author = req.session.userId; // Assuming userId stores the author's name or identifier
    await BlogPost.create({ title, content, author });
    res.redirect('/blog');
  } catch (error) {
    console.error('Error creating blog post:', error);
    res.status(500).send('Error creating blog post');
  }
});

// Route to display form for editing a blog post
router.get('/blog/edit/:id', isAuthenticated, async (req, res) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id);
    res.render('editBlogPost', { blogPost });
  } catch (error) {
    console.error('Error finding blog post for edit:', error);
    res.status(500).send('Error finding blog post');
  }
});

// Route to handle blog post update
router.post('/blog/edit/:id', isAuthenticated, async (req, res) => {
  try {
    const { title, content } = req.body;
    await BlogPost.findByIdAndUpdate(req.params.id, { title, content });
    res.redirect('/blog');
  } catch (error) {
    console.error('Error updating blog post:', error);
    res.status(500).send('Error updating blog post');
  }
});

// Route to handle blog post deletion
router.post('/blog/delete/:id', isAuthenticated, async (req, res) => {
  try {
    await BlogPost.findByIdAndDelete(req.params.id);
    res.redirect('/blog');
  } catch (error) {
    console.error('Error deleting blog post:', error);
    res.status(500).send('Error deleting blog post');
  }
});

module.exports = router;