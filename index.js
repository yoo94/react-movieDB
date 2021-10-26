const express = require('express')
const app = express()
const port = 5000


const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://yoo94:dbwotjr0329@reactbase.49thc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    .then(() => console.log('success connect mongoDB...'))
    .catch(err => console.log(err))

app.get('/', (req, res) => {
    res.send('Hello World! yoo94')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})