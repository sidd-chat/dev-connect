require('dotenv').config();

const mongoose = require('mongoose');

const User = require('./models/user.model');
const Snippet = require('./models/snippet.model');
const Review = require('./models/review.model');

const jwt = require('jsonwebtoken');
const authMiddleware = require('./tokenValidationMiddleware');
const bcrypt = require('bcrypt');

const express = require('express');
const cors = require('cors')

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.CONNECTION_STRING);

app.get('/', async (req, res) => {
  return res.json({
    message: "hemlo world!"
  })
});

app.post('/signup', async (req, res) => {
  try {
    const {username, email, password} = req.body;

    if(!username || !email || !password) {
      return res.status(400).json({
        error: true,
        message: "Fields Cannot Be Empty!"
      })
    }

    // $or expects an array of objects
    let isUser = await User.findOne({
      $or: [
        { email },
        { username }
      ]
    });
    if(isUser) {
      return res.status(400).json({
        error: true,
        message: "User Already Exists!"
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      username,
      email,
      password: hashedPassword
    });

    await user.save();

    const token = jwt.sign(
      { userId: user._id },
      process.env.SECRET_KEY,
      { expiresIn: '7d' }
    );

    return res.status(201).json({
      error: false,
      userId: user._id,
      token,
      message: 'User Signup Successful.'
    });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if(!email || !password) {
      return res.status(400).json({
        error: true,
        message: "Field Cannot Be Empty!"
      });
    }

    const user = await User.findOne({ email });
    if(!user) {
      return res.status(400).json({
        error: true,
        message: 'User Not Registered! Please Signup...'
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
      return res.status(400).json({
        error: true,
        message: 'Invalid Password!'
      });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.SECRET_KEY,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      error: false,
      userId: user._id,
      token,
      message: 'User Login Successful.'
    });
  } catch(err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post('/add-snippet', authMiddleware, async (req, res) => {
  try {
    const { title, snippetCode, caption } = req.body;
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        error: true,
        message: 'Unauthorized! Please log in.',
      });
    }

    // Check condition for title, snippet and or caption
    // if()

    const snippet = new Snippet({
      title,
      snippetCode,
      caption,
      language: 'javascript',
      author: user._id
    });

    await snippet.save();

    return res.status(201).json({
      error: false,
      snippet,
      message: 'Snippet Created Successfully!'
    })
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: `Server Error: ${err}`
    })
  }
});

app.get('/all-snippets', async (req, res) => {
  const snippets = await Snippet
    .find({})
    .populate("author", "username email profilePicture")
    .sort({ createdAt: -1 });

  return res.status(200).json({
    error: false,
    snippets,
    message: 'All Snippets Retrieved.',
  });
});

app.get('/snippet/:id/reviews', async (req, res) => {
  const snippetId = req.params.id;

  const reviews = await Review
    .find({ snippet: snippetId })
    .sort({ createdAt: -1 })

  return res.status(200).json({
    error: false,
    reviews,
    message: 'Reviews Retrieved Successfully.'
  });
});

app.post('/snippet/:id/reviews/post-star', authMiddleware, async (req, res) => {
  try {
    const snippetId = req.params.id;
    const { starRating } = req.body;
    const userId = req.user._id;

    const snippet = await Snippet.findOne({ _id: snippetId });
    if(!snippet) {
      return res.status(404).json({
        error: true,
        message: 'Snippet Not Found!'
      });
    }

    const existingReview = await Review.findOne({ snippet: snippetId, user: userId });

    if (existingReview) {
      return res.status(409).json({  // 409 Conflict status
        error: true,
        message: 'User already rated this snippet. Use PUT request to update rating.'
      });
    }

    const review = new Review({
      snippet: snippetId,
      user: userId,
      stars: starRating
    });
    await review.save();

    snippet.reviews.push(review._id);
    await snippet.save();

    return res.status(201).json({
      error: false,
      reviews: snippet.reviews,
      message: 'Snippet Starred Successfully.'
    });
  } catch (err) {
    res.status(500).json({ error: true, message: `Server Error: ${err}` });
  }
});

app.put('/snippet/:idSnippet/reviews/update-star', authMiddleware, async (req, res) => {
  try {
    const snippetId = req.params.idSnippet;
    const { starRating } = req.body;
    const userId = req.user._id;

    const snippet = await Snippet.findOne({ _id: snippetId });
    if(!snippet) {
      res.status(404).json({
        error: true,
        message: 'Snippet Not Found!'
      });
    }

    const review = await Review.findOneAndUpdate(
      { snippet: snippetId, user: userId },
      { stars: starRating },
      { new: true } // Ensures that the function returns the updated review instead of the old one.
    );
    if(!review) {
      res.status(404).json({
        error: true,
        message: 'Review Not Found! Send Post Request Instead.'
      });
    }

    return res.status(200).json({
      error: false,
      review,
      message: 'Star Rating Updated Successfully.'
    })
  } catch (err) {
    res.status(500).json({ error: true, message: `Server Error: ${err}` });
  }
});

app.get('/profile/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const userDetails = await User.findOne({ _id: id });

    return res.status(200).json({
      error: false,
      userDetails,
      message: 'User Details Retrived Succesfully.'
    });
  } catch (err) {
    console.log('Could Not Retrive Profile Details! Server Error:', err);
  }
});

app.get('/profile/:id/snippets', async (req, res) => {
  try {
    const id = req.params.id;

    const snippets = await Snippet
      .find({ author: id })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      error: false,
      snippets,
      message: 'User Details Retrived Succesfully.'
    });
  } catch (err) {
    console.log('Could Not Retrive Snippet Details! Server Error:', err);
  }
});

app.get('/snippet/:id/reviews/comments', async (req, res) => {
  try {
    const id = req.params.id;

    const comments = await Review.find({ snippet: id }).populate('user', 'username email profilePicture').sort({ createdAt: -1 });

    if (!comments || comments.length === 0) {
      return res.status(404).json({
        error: true,
        message: 'No Comments Found!'
      });
    }

    return res.status(200).json({
      error: false,
      comments,
      message: 'Comments Retrieved Successfully.'
    })
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: `Error fetching comments: ${err}`
    })
  }
});

app.post('/snippet/:id/reviews/post-comment', authMiddleware, async (req, res) => {
  try {
    const snippetId = req.params.id;
    const { comment } = req.body;
    const userId = req.user._id;

    if(!comment) {
      return res.status(400).json({
        error: true,
        message: 'Comment Cannot Be Empty!'
      });
    }

    const snippet = await Snippet.findOne({ _id: snippetId });
    if(!snippet) {
      return res.status(404).json({
        error: true,
        message: 'Snippet Not Found!'
      });
    }

    const newReview = new Review({
      snippet: snippetId,
      user: userId,
      comment: comment
    })
    await newReview.save();

    const populatedReview = await Review.findById(newReview._id).populate('user', 'username email profilePicture');
    return res.status(201).json({
      error: false,
      comment: populatedReview,
      message: 'Comment Added Successfully.'
    });
  } catch (err) {
    return res.status(500).json({
      error: true, message: `Server Error: ${err}`
    });
  }
});

app.delete('/snippet/:id/reviews/delete-comment', authMiddleware, async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user._id;

    const review = await Review.findOneAndDelete({ _id: id, user: userId });
    if(!review) {
      return res.status(404).json({
        error: true,
        message: 'Comment Not Found!'
      });
    }

    return res.status(200).json({
      error: false,
      review,
      message: 'Comment Deleted Successfully.'
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: `Error deleting comment: ${err}`
    })
  }
});

app.delete('/snippet/:id', authMiddleware, async (req, res) => {
  try {
    const id = req.params.id;

    const result = await Snippet.deleteOne({ _id: id });

    if (result.deletedCount === 1) {
      return res.status(200).json({
        error: false,
        result,
        message: "Snippet Deleted Successfully."
      });
    } else {
      return res.status(404).json({
        error: true,
        message: "Snippet Not Found!"
      });
    }
  } catch(err) {
      console.log('Error Deleting Snippet:', err);
      res.status(500).json({
        error: true,
        message: 'Failed to Delete Snippet'
      });
  }
});

app.get('/snippet/:id/reviews/get-stars', authMiddleware, async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user._id;

    const snippet = await Snippet.findOne({ _id: id })
      .populate({
        path: 'reviews',
        select: 'user stars',
        populate: {
          path: 'user',
          select: '_id'
        }
      });

    if (!snippet) {
      return res.status(404).json({ error: true, message: 'Snippet not found' });
    }
    const userReview = snippet.reviews.find(review => review.user._id.equals(userId));

    return res.status(200).json({
      error: false,
      stars: userReview ? userReview.stars : 0,
      reviews: snippet.reviews,
      message: 'Stars Retrieved Successfully.'
    })
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: `Error fetching stars: ${err}`
    })
  }
})
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));