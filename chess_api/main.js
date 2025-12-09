const express = require('express')
const app = express()
app.use(express.json())
const port = 3025

// app.use((req, res, next) => {
//   const err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// })
const newUser  = { username: "", password: "", id: 0 }

const credentials = {}

const checkInvalid = (val) => (val === undefined || val === null)

function findUserCredentials(username, password)
{
  if (checkInvalid(username) || checkInvalid(password))
  {
    throw new Error("Username or password is invalid.")
  }

  if (!credentials.hasOwnProperty(username))
  {
    throw new Error("Username is not registered.")
  }

  const credential = credentials[username]
  if (credential.password !== password)
  {
    throw new Error("Invalid password.")
  }

  return credential.id
}

function addUserCredentials(username, password)
{
  if (checkInvalid(username) || checkInvalid(password))
  {
    throw new Error("Username or password is invalid.")
  }

  if (credentials.hasOwnProperty(username))
  {
    throw new Error("Username is already registered.")
  }

  const id = Math.floor(Math.random() * 4294967295) // largest number for a 32-bit unsigned
  const user = structuredClone(newUser)
  user.username = username
  user.password = password
  user.id = id
  credentials[username] = user
  return id
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get("/login", (req, res) =>
{
    try 
    {
      const { username, password } = req.body
      const id = findUserCredentials(username, password)
      res.set("id", id)
      res.send({ message: "User successfully logged in."})
    }
    catch (e)
    {
      res.status(400).json({ message: e.message })
    }
})

app.post('/register', async (req, res) => 
{
  try 
    {
      const { username, password } = req.body
      const id = addUserCredentials(username, password)
      res.set("id", id)
      res.send({ message: "User successfully registered."})
    }
    catch (e)
    {
      res.status(400).json({ message: e.message })
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
