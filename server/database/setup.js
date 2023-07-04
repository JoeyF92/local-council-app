require("dotenv").config()
const fs = require('fs')
const path = require('path')

const sql = fs.readFileSync(path.join(__dirname,'./setup.sql')).toString()

const db = require('./connect')

db.query(sql)
    .then((data) => {
        db.end()
        console.log("Setup Complete")
    })
    .catch((error)=> {
        console.log(error)
    })  