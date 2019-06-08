const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');

const cors = require('cors')
require('dotenv').config()
// Set up the express app
const app = express();

const proj = require('./server/models/projects');
const user = require('./server/models/users');
const student = require('./server/models/students');
const studentproject = require('./server/models/studentProjects');
const category = require('./server/models/category');


//#region App settings
// Log requests to the console.
app.use(logger('dev'));
app.use(cors());
// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//#endregion

//#region Routing
app.get('/projects', proj.getProjects)
app.get('/projects/:id', proj.getProjectById)
app.get('/projects/category/:id', proj.getProjectByCategoryId)
app.post('/projects', proj.createProject)
app.put('/projects/:id', proj.updateProject)
app.delete('/projects/:id', proj.deleteProject)

app.get('/users', user.getUsers)
app.get('/users/:id', user.getUserById)
app.post('/users', user.createUser)
app.post('/login',user.userLogin);
app.put('/users/:id', user.updateUser)
app.delete('/users/:id', user.deleteUser)

app.get('/students', student.getStudents)
app.get('/students/:id', student.getStudentById)
app.post('/students', student.createStudent)
app.put('/students/:id', student.updateStudent)
app.delete('/students/:id', student.deleteStudent)


app.get('/studentproject', studentproject.getStudentProject)
app.get('/studentproject/:id', studentproject.getStudentProjectById)
app.post('/studentproject', studentproject.createStudentProject)
app.put('/studentproject/:id', studentproject.updateStudentProject)
app.delete('/studentproject/:id', studentproject.deleteStudentProject)

app.get('/category', category.getCategory)
app.get('/category/:id', category.getCategoryById)
app.post('/category', category.createCategory)
app.put('/category/:id', category.updateCategory)
app.delete('/category/:id', category.deleteCategory)



// Setup a default catch-all route that sends back a welcome message in JSON format.
// app.get('*', (req, res) => res.status(200).send({
//   message: 'Welcome to the beginning of nothingness.',
// }));
//#endregion


// This will be our application entry. We'll setup our server here.
const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);

module.exports = app;