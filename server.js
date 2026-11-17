const express = require("express");
const cors = require("cors");
const path = require("path");

// Calls the express function to start a new Express application
const app = express();

// ---------- Middleware ----------
// Middleware runs from top to bottom, in the order it is added with app.use

// Lets a page from another address (GitHub Pages) call this server
app.use(cors());

// Turns the JSON text in a POST or PUT request into the object request.body
app.use(express.json());

// Logger: prints every request to the console (and so to the Render log)
app.use(function (request, response, next) {
    console.log(new Date().toISOString() + " " + request.method + " " + request.url);
    if (request.method === "POST" || request.method === "PUT") {
        console.log("Body: " + JSON.stringify(request.body));
    }
    next(); // pass the request on to the next middleware, or it would hang here
});

// Static files: /images/maths.jpg returns the file images/maths.jpg
const imagePath = path.resolve(__dirname, "images");
app.use("/images", express.static(imagePath));

// Only reached when express.static did not find the file
app.use("/images", function (request, response) {
    response.status(404).send("Image not found!");
});

// Anything that reached this point matched nothing above
app.use(function (request, response) {
    response.status(404).send("Page not found!");
});

// Render chooses the port and passes it in process.env.PORT; 3000 is for running locally
const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("App started on port " + port);
});
