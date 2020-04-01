const { model, Schema } = require("mongoose");

const countrySchema = new Schema({
  name: String
});

module.exports = model("Country", countrySchema);
