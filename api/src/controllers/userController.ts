import type { Request, Response } from "express"
import { users } from "../models/user.ts"
import type { user } from "../models/user.ts"

interface userInfoProp {
    username: string;
    password: string;
}

const checkInvalid = (val: any): boolean => (val === undefined || val === null)

function findUserCredentials(username: string, password: string): number
{
  if (checkInvalid(username) || checkInvalid(password))
  {
    throw new Error("Username or password is invalid.")
  }

  if (!users.hasOwnProperty(username))
  {
    throw new Error("Username is not registered.")
  }

  const credential: user = users[username] as user // ts does like that it can be undefined
  if (credential.password !== password)
  {
    throw new Error("Invalid password.")
  }

  return credential.id
}

function addUserCredentials(username: string, password: string): number
{
  if (checkInvalid(username) || checkInvalid(password))
  {
    throw new Error("Username or password is invalid.")
  }

  if (users.hasOwnProperty(username))
  {
    throw new Error("Username is already registered.")
  }

  const id = Math.floor(Math.random() * 4294967295) // largest number for a 32-bit unsigned
  const userData: user = { username, password, id }
  users[username] = userData
  return id
}

export function userLogin(req: Request, res: Response): void
{
    try 
    {
      const { username, password }: userInfoProp = req.body
      const id: number = findUserCredentials(username, password)
      res.send({ message: "User successfully logged in.", id })
    }
    catch (e)
    {
      res.status(400).json({ message: (e as Error).message })
    }
}

export function userRegister(req: Request, res: Response): void
{
  try 
    {
      const { username, password }: userInfoProp = req.body
      const id: number = addUserCredentials(username, password)
      res.send({ message: "User successfully registered.", id })
    }
    catch (e)
    {
        res.status(400).json({ message: (e as Error).message })
    }
}