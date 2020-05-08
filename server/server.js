var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');
var app = express();
var mongoose = require('mongoose')
var port = process.env.PORT || 3000
var path = require('path');

app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload({
    limits: { fileSize: 1 * 1024 * 1024 },} // 1 MB File size
));
app.use(bodyParser.urlencoded({extended:false}))

const mongoURI = 'mongodb://localhost:27017/edurexdb';

mongoose.connect(mongoURI, {useNewUrlParser:true})
.then(() => console.log("MongoDB Edurex Database Connected ..."))
.catch(err => console.log(err));




var Users = require('./routes/Users');
var Boards = require('./routes/Boards');
var Class = require('./routes/Class');
var Subject = require('./routes/Subjects');
var Session = require('./routes/Sessions')
var Group = require('./routes/Groups'); 
var Assessment = require('./routes/Assessments');
var Chapter = require('./routes/Chapters');
var LibraryCategory = require('./routes/LibraryCategories')
var Book = require('./routes/Books');

app.use('/thumbnail',express.static(path.join(__dirname, 'uploads/library/cover-photos/')));
app.use('/users', Users);
app.use('/boards', Boards);
app.use('/class', Class);
app.use('/subjects', Subject);
app.use('/sessions', Session);
app.use('/subject-groups',Group);
app.use('/assessments',Assessment);
app.use('/chapters',Chapter);
app.use('/library/category',LibraryCategory);
app.use('/library/books',Book);



app.listen(port, function()
{
    console.log("Edurex Server is running on port "+ port);
});