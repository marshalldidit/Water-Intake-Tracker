// let express = require('express');

//DB - 0 - install and load lowdb
import express from 'express';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

let app = express();

//DB - 1 - connect to the database
let defaultData = { waterIntakeData: [] };
let adapter = new JSONFile('db.json');
let db = new Low(adapter, defaultData);


app.use(express.json());

let waterTracker = [];

// app.get('/', (req, res) => {
//     res.send('this is the home page');
// })

// add a route on server that is listening for a POST request

app.post('/noWater', (req, res) => {
    console.log(req.body);
    let currentDate = Date();
    let obj = {
        date: currentDate,
        water: req.body.number
    }
    //waterTracker.push(obj);
    // console.log(waterTracker);

    //DB - 2 - add value to the database

    db.data.waterIntakeData.push(obj);
    db.write()
        .then(() => {
            res.json({task: 'success'});
        })
})

app.use('/', express.static('public'));

app.listen(5000, () => {
    console.log('server is running on port 5000');
})

// add route to get all water intake from the server and send it to the client
app.get('/getWater', (req, res) => {
    // let obj = {data: waterTracker};

    //DB - 3 - fetch from the database
    db.read()
        .then(() => {
            let obj = {data: db.data.waterIntakeData};
            res.json(obj);
        })
})