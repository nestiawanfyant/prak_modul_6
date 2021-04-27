const mongoose = require("mongoose");
const PrakpamSchema = new mongoose.Schema({
  name: String,
  nim: String,
});
mongoose.model("dataMahasiswa", PrakpamSchema);
