const express = require('express');
const mongoose = require('mongoose');
//const bodyParser = require('body-parser');
const path = require('path');
const config = require('config');


const app = express();

//Bodyparser middleware
//app.use(bodyParser.json()); Instead use express inbuild parser
app.use(express.json());

//DB config
// const db = require('./config/keys').mongoURI;
const db = config.get('mongoURI');

// Connect to mongoDB

mongoose
    .connect(db, {
        usedNewUrlParser: true,
        useCreateIndex: true
    })
	.then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));
console.log("before connect to monogdb");
/*mongoose.connect(db, () => { }, { useNewUrlParser: true })
    .catch(err => {
        console.log("Monog connect error occured: ", err);
    });*/


// Use routes
app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

// Serve static assests if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on ${port}`));