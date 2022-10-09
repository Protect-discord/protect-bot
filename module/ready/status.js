/**
 * ステータス変更
 * @param {import('discord.js').Client} client
 */
module.exports = async (client) => {
  const package = require("../../package.json")

  let stats = 0
  setInterval(() => {
    if (stats == 0) {
      client.user.setActivity(`/help || ping:${client.ws.ping}ms`, {
        type: "PLAYING",
      })
      stats = 1
    } else if (stats == 1) {
      client.user.setActivity(`probot.ml || ver:${package.version}`, {
        type: "PLAYING",
      })
      stats = 2
    } else if (stats == 2) {
      client.user.setActivity(
        `${client.guilds.cache.size}server || ${client.guilds.cache
          .map((g) => g.memberCount)
          .reduce((a, c) => a + c)}user`,
        {
          type: "PLAYING",
        }
      )
      stats = 0
    }
  }, 6000)

  console.info(`\x1b[34mINFO:READY USER:${client.user.tag}`)
  console.info(
    `\x1b[34mINFO:<${client.guilds.cache.size}>SERVER <${client.guilds.cache
      .map((g) => g.memberCount)
      .reduce((a, c) => a + c)}>USER`
  )
}
