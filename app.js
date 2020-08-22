var express = require("express");
const { response } = require("express");
const bookRouter = express.Router();
const mongoose = require("mongoose");
const db = mongoose.connect("mongodb://localhost/bookAPI");
const Book = require("./models/bookModel");

var app = express();
bookRouter.route("/books")
.get((req, res) => {
 
    Book.find((err, books) => {
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
