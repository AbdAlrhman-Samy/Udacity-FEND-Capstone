const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

app.use(express.static('dist'))

let data = {};

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

app.post('/add', (req, res)=>{
    data.tempMax = req.body.tempMax;
    data.tempMin = req.body.tempMin;
    data.icon = req.body.weatherIcon
    data.location = req.body.location;
    console.log(data);
    res.send(data)
})


const PORT = 8080
app.listen(PORT, runServer)

const runServer = () =>{
    console.log(`running on port ${PORT}`)
};

const testing = (a,b) => {
    return a+b
}
export {testing}