import * as fs from './../shared/fs'
import { AMAZDRIP_FILE_NAME } from './constants'

export function readFileSync() {
  const resData = fs.readFileSync(AMAZDRIP_FILE_NAME)
  return !resData ? [] : JSON.parse(resData)
}

export function writeFileSync(data, merge = true) {
  let params = data
  if (merge) {
    params = [...readFileSync(), ...data]
  }
  fs.writeFileSync(AMAZDRIP_FILE_NAMEj, JSON.stringify(params))
}
