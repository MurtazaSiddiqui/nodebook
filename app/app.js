const connetToMongo = require('./config/db.config');
const express = require('express')

connetToMongo()
const app = express()
const port = 5000

app.use(express.json())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`Kindle Note Book-backend listening on port ${port}`)
})