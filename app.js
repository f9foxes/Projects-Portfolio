//Require dependencies 
const express = require('express');
const app = express();
const { projects } = require('./data.json');

//Set view engine to pug
app.set('views', 'Projects-Portfolio/views');
app.set('view engine', 'pug');

//Serve static files in public folder
app.use('/static', express.static('Projects-Portfolio/public'));

//Routes to home page
app.get('/', (req, res) => {
    res.render('index', {projects});
});

//Routes to about page
app.get('/about', (req, res, next) => {
    res.render('about');
});

//Routes to project page based on project clicked
app.get('/project/:id', (req, res, next) => {
    const projectId = req.params.id;
    const project = projects.find( ({id}) => id === +projectId);
    if(project) {
        res.render('project', {project});
    } else {
        next();
    }
});

//Throw 404 error
app.use((req, res, next) => {
    const err = new Error('Page Not Found');
    err.status = 404;
    next(err);
});

//Catch errors and render page based on error status
app.use((err, req, res, next) => {
    if(err.status !== 404) {
        err.status = 500;
        err.message = 'Something went Wrong';
        res.status(err.status);
        console.log(err.status, err.message);
        res.render('error', {err});
    }

    console.log(err.status, err.message);
    res.render('page-not-found', {err})
});

//Boot server
app.listen(3000, () => {
  console.log("Server listening on 3000");
});
