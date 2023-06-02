import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import https from 'https';
import fs from 'fs';

dotenv.config();

const app: Express = express();
app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT || 443;

// set up SSL encryption
const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/dzgwriting.xyz/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/dzgwriting.xyz/fullchain.pem'),
  secureProtocol: 'TLSv1_2_method'
};

// here is mongoDB schema
const Schema = mongoose.Schema;
const blogPostSchema = new Schema({
  tagline: String, 
  headline: String, 
  image: String,
  id: String,
  fulltext: String,
})

// Get the URI we want to connect to from env variables if it exists, else throw err
if (!process.env.MONGODB_URI) {
  throw new Error('MongoDB URI is missing in the environment variables.');
}
else if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
}
else {
  throw new Error('MongoDB connection failed.');
}
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('we connected to the mongoDB!');
});

// Get all blogposts' taglines/headlines/images
app.get('/blogposts', (req, res) => {
  const posts = mongoose.model('blogpost', blogPostSchema)
  posts.find().then((value) => {
    res.send(value); // Send the result to the client
  }).catch((error) => {
    console.log(error);
    res.status(500).send('An error occurred'); // Send an error response if there was an error
  });
});
  
// Get fulltext for a specific blogpost
app.get('/blogposts/:id', (req, res) => {
  const blogpostId = req.params.id;
  const posts = mongoose.model('blogpost', blogPostSchema);
  posts.findById(blogpostId).then((blogpost) => {
    if (!blogpost) {
      // If the specified blog post is not found, return a 404 Not Found response
      return res.status(404).send('Blog post not found');
    }
    // Return the full text of the blog post
    res.send(blogpost);
  }).catch((error) => {
    console.log(error);
    res.status(500).send('An error occurred');
  });
});

// Create a new blogpost
app.post('/blogposts', (req, res) => {
  const { tagline, headline, image, fulltext } = req.body;

  const posts = mongoose.model('blogpost', blogPostSchema);
  const newPost = new posts({
    tagline,
    headline,
    image,
    fulltext
  });

  newPost.save()
    .then((createdPost) => {
      res.status(201).send(createdPost);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send('An error occurred');
    });
});


const server = https.createServer(options, app);

server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
