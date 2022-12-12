import fs from 'fs'
import { promisify } from 'util'

import { Rarity, RoleName } from '../../../../shared/treachery'

type Cards = {
  [x in Rarity]: string[]
}

type Roles = {
  [x in RoleName]: Cards
}

type WinConditions = {
  [x in RoleName]: string
}

const read = promisify(fs.readFile)
const write = promisify(fs.writeFile)

const readFile = async (path: string) => {
  const contents = await read(path)
  return JSON.parse(contents.toString()) as unknown
}

//* Rooms

const ROOM_PATH: string = 'public/treacheryRooms.json'

export const getRooms = async () => {
  return (await readFile(ROOM_PATH)) as Rooms
}

export const saveRooms = async (rooms: Rooms) => {
  await write(ROOM_PATH, JSON.stringify(rooms))
}

//* Roles

export const getRoles = async () => {
  return (await readFile('public/treacheryRoles.json')) as Roles
}

//* Win Conditions

export const getWinConditions = async () => {
  return (await readFile('public/treacheryWinConditions.json')) as WinConditions
}
