const express = require('express');
const routes = require('./src/routes');
const config = require('./src/config');
const cookieParser  = require('cookie-parser');
const morgan  = require('morgan');
const cors = require('cors');

const app = express();


app.use(cors({
    origin:true,
    credentials:true
}));

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('common'));
app.use(routes);


//app.use(express.static(path.join(__dirname, 'react-project/build')));

app.get('/', (req, res) => {
    //res.sendFile(path.join(__dirname, '/react-project/build/index.html'));
    return res.redirect("http://localhost:3000");
});

app.listen(config.port, () => console.log(`Server is running : ${config.port}`));