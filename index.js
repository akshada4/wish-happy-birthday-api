const express = require('express');
const multer = require('multer');
const upload = multer();
const app = express();


app.post("/", upload.none(), (req,res) => console.log(req.body.sender))

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`))