const mongoose = require("mongoose");
const cliLength = process.argv.length;
const password = process.argv[2];
const url = `mongodb+srv://nicklatcham:${password}@fullstackone.lxnhe7w.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (cliLength === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });
  person.save().then((result) => {
    console.log("Note Saved Succesfully!");
    mongoose.connection.close();
  });
} else if (cliLength === 3) {
  console.log("phonebook:");
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
} else {
  console.log("Add an entry or enter password to see entries");
  console.log(cliLength);
  process.exit(1);
}
