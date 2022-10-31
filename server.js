const express = require('express')

const multer = require('multer');
const upload = multer({ dest: 'uploads/' })

const app = express()

const { uploadFile, getFileStream } = require('./s3');

app.get('/images/:key', (req, res) => {
    const key = req.params.key;
    const readStream = getFileStream(key)

    readStream.pipe(res)
})

app.post('/images', upload.single('file'), async (req, res) => {
    const file = req.file
    const result = await uploadFile(file);
    console.log(result);
    const description = req.body.description
    res.send({ imagePath: `/images/${result.Key}` })
})

app.listen(8080, console.log('listening on port 8000'))