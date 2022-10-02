module.exports = async (client) => {
  const package = require("../../package.json")
  require("dotenv").config()
  const {
    SlashCommandBuilder,
    ContextMenuCommandBuilder,
  } = require("@discordjs/builders")
  const {REST} = require("@discordjs/rest")
  const {Routes, ApplicationCommandType} = require("discord-api-types/v10")

  const rest = new REST({version: "10"}).setToken(process.env.DISCORD_TOKEN)

  let stats = 0
  setInterval(() => {
    if (stats == 0) {
      client.user.setActivity(`/help || ping:${client.ws.ping}ms`, {
        type: "PLAYING",
      })
      stats = 1
    } else if (stats == 1) {
      client.user.setActivity(`test || ver:${package.version}`, {
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

  //スラッシュコマンド
  await rest.put(Routes.applicationCommands(client.application.id), {
    body: [
      new SlashCommandBuilder()
        .setName("help")
        .setDescription("BOTの使い方を表示します"), //配列にして追加していく
    ],
  })
}
