const express = require("express");
const dbConnect = require("./db/db.config");
const stdRouter = require("./routes/student.routes");
const cors = require("cors");
const userRouter = require("./routes/user.routes");

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("", stdRouter);
app.use("/user", userRouter);
app.get("/", (req, res) => {
  res.send("<h1>Hello  World!</h1>");
});

dbConnect();
app.listen(5000, () => console.log("http://localhost:5000"));
