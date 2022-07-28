const express = require("express");
const connect = require("./schemas");
const app = express();
const port = 3000;

connect();

const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");

app.use((req, res, next) => {
    console.log("Request URL:", req.originalUrl, " - ", new Date());
    next();
})

app.use(express.json());
app.use("/api", [postsRouter, commentsRouter]);

app.listen(port, () => {
    console.log(port, "포트에서 서버 실행");
})