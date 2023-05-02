const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;
console.log("connecting...");

function matchMe(number) {
  return number.match("-");
}

mongoose
  .connect(url)
  .then((result) => console.log("**connected!**"))
  .catch((error) => console.log(`error: ${error.message}`));

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, "Must be atleast 3 letters long"],
    required: true,
  },
  number: {
    type: String,
    validate: {
      //TODO: additional validation to limit to one-hyphen "-"
      validator: (number) => {
        return /^(\d{2}-\d{5})|^(\d{3}-\d{4})/.test(number);
      },
      message:
        "Format must be XX-XXXXX... OR XXX-XXXX... and contain only one(1) '-' ",
    },
    required: true,
    minLength: 8,
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = String(returnedObject._id);
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
