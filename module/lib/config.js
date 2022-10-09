const fs = require("node:fs")
/**
 * @typedef {Object} configData
 * @prop {Object} server
 * @prop {Object} user
 */
/**
 * @type {configData}
 */
const data = {
  server: JSON.parse(fs.readFileSync(`../../data/server.json`)),
  user: JSON.parse(fs.readFileSync(`../../data/user.json`)),
}
const handler = {
  get: (_obj, prop) => {
    return JSON.parse(fs.readFileSync(`../../data/${prop}.json`))
  },
  set: (obj, prop) => {
    fs.writeFileSync(
      `../../data/${prop}.json`,
      JSON.stringify(obj[prop], null, "  ")
    )
    return JSON.parse(fs.readFileSync(`../../data/${prop}.json`))
  },
}
/**
 * @type {configData}
 */
module.exports = new Proxy(data, handler)
