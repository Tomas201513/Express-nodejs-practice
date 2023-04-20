const joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/courses", (req, res) => {
  res.send(courses);
});
app.get("/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given ID was not found");

  res.send(course);
});

// app.post("/courses", (req, res) => {
//   if (!req.body.name || req.body.name.length < 3) {
//     res.status(400).send("Name is required and should be minimum 3 characters");
//     return;
//   }
//   const course = {
//     id: courses.length + 1,
//     name: req.body.name,
//   };
//   courses.push(course);
//   res.send(course);
// });

app.post("/courses", (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) {
    //   res.status(400).send(result.error);
    return res.status(400).send(result.error.details[0].message);
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

app.put("/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("The course with the given ID was not found");
    return;
  }
  const { error } = validateCourse(req.body);
  if (error) {
    return res.status(400).send(result.error.details[0].message);
  }
  course.name = req.body.name;
  res.send(course);
});

app.delete("/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send("The course with the given ID was not found");
  }
  console.log(course);
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

const validateCourse = (course) => {
  const schema = joi.object({
    name: joi.string().min(3).required(),
  });
  return schema.validate(course);
};
