const exp = require("express");
const app = exp();
const bp = require("body-parser");
const mongosee = require("mongoose");
const morgan = require("morgan");
const { error, success } = require("consola");


app.use(morgan("dev"));
app.get("/", (req, res) => {
  res.send("Wellcome to node js");
});

app.listen(1000, () => {
  console.log("server running");
});

require("./prakSchema");

const prakSchema = mongosee.model("dataMahasiswa");
const mongoUri = "mongodb+srv://nestiawanfyans:Nestiawan@321@cluster0.03cs9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongosee.connect(mongoUri, {
  useFindAndModify: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

mongosee.connection.on("connected", () => {
  success({
    message: "Connected to mongo",
    badge: true,
  });
});

mongosee.connection.on("error", (err) => {
  console.log("error to connected mongo", err);
});

app.listen(7070, () => {
  success({
    message: `Server started`,
    badge: true,
  });
});

app.use(bp.json());

app.post("/api/v1/save-data", (req, res) => {
  const datas = new prakSchema({
    name: req.body.name,
    nim: req.body.nim,
  });
  datas.save()
    .then((data) => {
      res.status(201).json({
        success: true,
        message: "Berhasil menyimpan data",
        data: data,
      });
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        message: err,
      });
    });
});

app.get("/api/v1/prak", (req, res) => {
  prakSchema
    .find({})
    .then((data) => {
      res.status(200).json({
        success: true,
        message: "Semua Data",
        data: data,
      });
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        message: err,
      });
    });
});
