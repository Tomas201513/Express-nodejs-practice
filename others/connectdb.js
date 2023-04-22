const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const courseSchema = new mongoose.Schema({
  name: String,
  height: Number,
  weight: Number,
  age: Number,
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "react Course",
    height: 532,
    weight: 100,
    age: 3315,
  });

  const result = await course.save();
  console.log(result);
}

createCourse();
