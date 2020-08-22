var express = require("express");
const { response } = require("express");
const bookRouter = express.Router();
const mongoose = require("mongoose");
const db = mongoose.connect("mongodb://localhost/bookAPI");
const Book = require("./models/bookModel");
const bodyParse = require("body-parser");
const bodyParser = require("body-parser");
const { json } = require("body-parser");

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParse.json());
bookRouter.route("/books")
.get((req, res) => {
   const query = {};
   if(req.query.genre){
       query.genre = req.query.genre;
   }
    Book.find(query, (err, books) => {
        if(err){
           return  res.send(err);
        }

           return res.json(books);

    });
});
bookRouter.route("/books")
.post((req,res) => {
    const book = new Book(req.body);
    book.save();
    return res.status(201).json(book);
});
bookRouter.route("/books/:bookId")
.get((req, res) => {
   const query = {};
   if(req.query.genre){
       query.genre = req.query.genre;
   }
    Book.findById(req.params.bookId, (err, books) => {
        if(err){
           return  res.send(err);
        }

           return res.json(books);

    });
});
app.use("/api", bookRouter);

app.get("/", (req, res) => {
    const response = {hello: 'Hello from api'};
    res.json(response);
});
app.listen(8081);
