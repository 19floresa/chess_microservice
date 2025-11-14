const express = require('express')
const app = express()
app.use(express.json())
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post("/login", (req, res) =>
{
    res.send('login not created yet')
})

app.post('/register', (req, res) => 
{
    const { username, password } = req.body
    if (username === undefined || password === undefined)
    {
        res.status(400).json({ message: "username or password is undefined."})
        return
    }
    console.log(username)
    res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
