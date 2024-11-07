import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Qsefthukoz1!",
  database: "test",
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("hello this is the backend");
});

app.get("/post", (req, res) => {
  const q = "SELECT * FROM test.blog_posts;";

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/post", (req, res) => {
  const q = "INSERT INTO blog_posts (`title`, `author`, `content`) VALUES (?)";
  const values = [req.body.title, req.body.author, req.body.content];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("book has been created successfuly");
  });
});

app.delete("/post/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM blog_posts WHERE id = ?";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("book has been deleted successfuly");
  });
});

app.put("/post/:id", (req, res) => {
  const postId = req.params.id;

  const q =
    "UPDATE blog_posts SET `title` = ?, `author` = ?, `content` = ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.author,
    req.body.content,
  ]


  db.query(q, [...values, postId], (err, data) => {
    if (err) return res.json(err)
      return res.json('post has been updated successfuly')
  })
});

app.listen(8800, () => {
  console.log("Backend is active");
});
