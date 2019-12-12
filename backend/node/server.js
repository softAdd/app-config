const http = require('http')
const express = require('express')
const app = express()
const server = http.createServer(app)

const { APP_PORT, APP_IP } = process.env

app.get('/', (req, res) => {
    res.send('Hello from express')
})

server.listen(APP_PORT || 3000, APP_IP || '127.0.0.1', () => console.log(`Server running at http://${APP_IP}:${APP_PORT}/`))

process.on('SIGTERM', () => {
    console.info('SIGTERM signal received.')
    console.log('Closing http server.')
    server.close(() => {
        console.log('Http server closed.')
        process.exit(0)
    })
})