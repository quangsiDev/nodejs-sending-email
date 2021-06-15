const express = require("express");
const app = express();
const axios = require("axios");
require("dotenv").config();
var https = require("https");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
const path = require("path");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// get admin token
// const headers = {
//   "Content-Type": "application/json",
//   Authorization: `Bearer ${process.env.TOKEN}`,
// };

app.use(cors());
const port = process.env.PORT || 5000;
app.use(express.static(path.join(__dirname, "build")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
// app.get("/check-cource", cors(), async (req, res) => {
//   let data = req.body;
//   console.log("datat", data);
//   axios
//     .post("https://elearning0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachKhoaHocDaXetDuyet", data, headers)
//     .then((res) => {
//       console.log(`statusCode: ${res.statusCode}`);
//       console.log(res);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// });

app.post("/send-mail", cors(), async (req, res) => {
  console.log("yes - connection:", req.body);
  let user = req.body.user;
  let course = req.body.course;
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  let mailOption = {
    from: process.env.EMAIL,
    to: `${user.email}`,
    subject: "Welcome to The Course - Getting Started",
    text: `Hi ${user.hoTen}. You have registered successfully ${course.tenKhoaHoc}!`,
  };
  transporter.sendMail(mailOption, (err, ddta) => {
    if (err) {
      console.log("err", err);
    } else {
      console.log("YES -- email send! ");
    }
  });
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
