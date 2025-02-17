const express = require("express");
const { conection } = require("./config/db");
const adminrouter = require("./routers/adminrouter");
const dotenv = require("dotenv").config();
const cors = require("cors");
const productrouter = require("./routers/productrouter");
const userrouter = require("./routers/userrouter");
const auth = require("./middleware/auth");
const cartRouter = require("./routers/cartRouter");

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//admin
app.use("/admin", adminrouter);
app.use("/product", productrouter);

//user
app.use("/user", userrouter);
app.use(auth);
app.use("/cart", cartRouter);


app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(err);
  }
  conection();
  console.log("server is started");
});