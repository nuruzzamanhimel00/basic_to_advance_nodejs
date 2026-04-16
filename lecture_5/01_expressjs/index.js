const express = require('express')

const app = express()
const port = 8000

app.get('/', (req, res) => {
  res.header(200)
  res.end('Hello World!')
});

app.get('/contact-us', (req, res) => {
  res.end('Contact Us')
});

app.get('/about-us', (req, res) => {
  res.end('About Us')
});

app.post('/send-email', (req, res) => {
  res.status(201).end('Email Sent!')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})