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
  server: JSON.parse(fs.readFileSync(`${__dirname}/../../data/server.json`)),
  user: JSON.parse(fs.readFileSync(`${__dirname}/../../data/user.json`)),
}
const writeConfig = () => {
  fs.writeFileSync("data/server.json", JSON.stringify(data.server, null, "  "))
  fs.writeFileSync("data/user.json", JSON.stringify(data.user, null, "  "))
}

module.exports = {config: data, writeConfig}
