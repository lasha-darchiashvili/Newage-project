const express = require("express");
const app = express();

const contactsRouter = require("./routes/contacts");

app.use(express.json());

app.use("/contacts", contactsRouter);

app.listen("3000", () => {
  console.log("server started");
});
