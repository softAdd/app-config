const http = require('http')
const express = require('express')
const app = express()
const server = http.createServer(app)

app.get('/', (req, res) => {
    res.send('Hello from express')
})

server.listen(process.env.APP_PORT || 3000, process.env.APP_IP || '127.0.0.1', () => console.log('Server started...'))