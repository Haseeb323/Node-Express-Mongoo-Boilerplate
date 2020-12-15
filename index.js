require("dotenv").config();
require("./db/mongodb");

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

const taskRouter = require("./routes/taskRouter");
const listRouter = require("./routes/listRouter");

app.use("/api/list", listRouter);
app.use("/api/task", taskRouter);

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
