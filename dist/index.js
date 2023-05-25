"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
const port = process.env.PORT || 443;
const Schema = mongoose_1.default.Schema;
const blogPostSchema = new Schema({
    tagline: String,
    headline: String,
    image: String,
    id: String,
    fulltext: String,
});
mongoose_1.default.connect('mongodb+srv://daniel:r4OgvykQbzXAqDJ5@danielblog.te9b5na.mongodb.net/?retryWrites=true&w=majority');
const db = mongoose_1.default.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log('we connected to the mongoDB!');
});
// Get all blogposts' taglines/headlines/images
app.get('/blogposts', (req, res) => {
    const posts = mongoose_1.default.model('blogpost', blogPostSchema);
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
    const posts = mongoose_1.default.model('blogpost', blogPostSchema);
    posts.findById(blogpostId).then((blogpost) => {
        if (!blogpost) {
            // If the specified blog post is not found, return a 404 Not Found response
            return res.status(404).send('Blog post not found');
        }
        // Return the full text of the blog post
        res.send(blogpost.fulltext);
    }).catch((error) => {
        console.log(error);
        res.status(500).send('An error occurred');
    });
});
// Create a new blogpost
app.post('/blogposts', (req, res) => {
    const { tagline, headline, image, fulltext } = req.body;
    const posts = mongoose_1.default.model('blogpost', blogPostSchema);
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
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
