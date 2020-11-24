require("dotenv").config();

const express = require("express");

const cors = require("cors");

const router = require("./routes/index");

const port = process.env.PORT || 5000;

const app = express();

app.use(cors());

app.use(express.json());

app.use("/uploads/img", express.static("uploads/img"));
app.use("/uploads/pdf", express.static("uploads/pdf"));

app.use("/api/v1/", router);

app.listen(port, () => console.log(`Listening on port ${port}`));
