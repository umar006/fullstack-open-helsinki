const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const uri = `mongodb+srv://umar006:${password}@helsinki-0.rtkeoca.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

mongoose.connect(uri);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length >= 5) {
  const name = process.argv[3];
  const number = process.argv[4];
  const person = new Person({
    name,
    number,
  });

  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
    process.exit(0);
  });
}

Person.find({}).then((result) => {
  console.log("phonebook:");
  result.forEach((person) => {
    console.log(person.name, person.number);
  });
  mongoose.connection.close();
});
