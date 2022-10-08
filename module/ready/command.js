const { Client } = require("discord.js")

/**
 * コマンド登録
 * @param {Client} client 
 */
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

  //スラッシュコマンド
  await rest.put(Routes.applicationCommands(client.application.id), {
    body: [
      new SlashCommandBuilder()
        .setName("help")
        .setDescription("BOTの使い方を表示します"),
      new SlashCommandBuilder().setName("report").setDescription("通報します"),
      new SlashCommandBuilder()
        .setName("scan")
        .setDescription("サーバーをスキャンし安全を確認します"),
    ],
  })
}
